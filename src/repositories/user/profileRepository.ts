import {
  Profile,
  profileData,
  userProfileConnection,
} from "../../entities/profile";

import { IPofileRepository } from "../../interfaces/user/profile/IProfileRepository";

import notificationModel from "../../frameWorks/mongodb/models/notificationModel";
import { ObjectId, Schema, Types } from "mongoose";
import UserModel from "../../frameWorks/mongodb/models/userModel";
import SubscriptionModel from "../../frameWorks/mongodb/models/subscriptionModel";

import chatRoomModel from "../../frameWorks/mongodb/models/chatRoomMode";
import webpush from "web-push";
import cron from "node-cron";
import searchSubscriptionModel from "../../frameWorks/mongodb/models/searchSubscription";
import paymentSummaryModel from "../../frameWorks/mongodb/models/paymentSummary";
import { fcmSubscription, userDetails, userList } from "../../entities/user";
import {
  acceptRequest,
  notificationDisplayDetails,
  NotificationType,
  senderNotification,
  statusUpdate,
} from "../../entities/notification";

import { paymentSummary } from "../../entities/paymentSummary";
import { IChatroom } from "../../entities/conversation";

const config = {
  subject: "mailto:emilshiju10@gmail.com",
  publicKey:
    "BMdNWN2lmEXF2F9cjH-zOOA-7ugTGloANQyN5i1w3Pw3hVvyOsjdKPTiGBkWET93CLcO8ix_mZFWJUpPBOI3dbM",
  privateKey: "Fz37yqFAq68p8cFeQb_usGOOux8ab1kGlnjsuampu1M",
};

webpush.setVapidDetails(config.subject, config.publicKey, config.privateKey);

export class ProfileRepository implements IPofileRepository {
  async RcreateProfile(input: Profile): Promise<userList> {
    try {
      const updateData = {
        bio: input.bio,
        profession: input.profession,
        nickName: input.nickName,
        imageUrl: input.imageUrl,
      };

      const profile = await UserModel.findOneAndUpdate(
        { _id: input.userId },
        updateData,
        { new: true }
      );

      return profile?.toObject() as userList;
    } catch (error) {
      throw error;
    }
  }

  async RgetProfileUrl(input: string): Promise<profileData | boolean> {
    try {
      const user = await UserModel.findById(input);
      console.log(user);
      if (user?.nickName) {
        const data = {
          nickName: user?.nickName,
          profession: user?.profession,
          bio: user?.bio,
          imageUrl: user?.imageUrl,
          currSearch: user?.currSearch,
          maxSearch: user?.maxSearch,
          profileUrl: user?.images,
        };

        return data;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async RupdateImageUrl(
    userId: Schema.Types.ObjectId,
    imageUrl: string
  ): Promise<{ imageUrl: string | null }> {
    try {
      const found = await UserModel.findByIdAndUpdate(userId, {
        imageUrl: imageUrl,
      });
      console.log(found);
      const url = {
        imageUrl: found?.imageUrl || "",
      };
      return url;
    } catch (error) {
      throw error;
    }
  }

  async RconnectionNotification(
    senderName: string,
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId,
    userProfileId: Schema.Types.ObjectId,
    receiverProfileId: Schema.Types.ObjectId
  ): Promise<any> {
    try {
      const notification = await new notificationModel({
        senderId,
        receiverId,
        senderProfile: userProfileId,
        receiverIdProfile: receiverProfileId,
        type: "connect",
        message: `${senderName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save = await savedNotification.populate("senderProfile");

      return save;
    } catch (error) {
      throw error;
    }
  }

  async RgetNotification(userId: string): Promise<any> {
    try {
      const connectRequests = await notificationModel.find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      });
      if (!connectRequests || connectRequests.length === 0) {
        return false;
      }

      await Promise.all(
        connectRequests.map(async (connectRequest) => {
          if (connectRequest.senderId.toString() == userId) {
            await connectRequest.populate("receiverId");
          }
          if (connectRequest.receiverId.toString() === userId) {
            await connectRequest.populate("senderId");
          }

          // Optionally save each updated connect request
          await connectRequest.save();
        })
      );
      return connectRequests;
    } catch (error) {
      throw error;
    }
  }

  async acceptedRequest(
    senderId: Schema.Types.ObjectId,
    receiverId: Schema.Types.ObjectId
  ): Promise<acceptRequest | null> {
    try {
      const userProfile: userDetails | null = await UserModel.findById(
        senderId
      );

      if (!userProfile) {
        // No profile found for the user
        return null;
      }

      const connection: userProfileConnection = userProfile.connections.find(
        (conn) => conn.userId && conn.userId.equals(receiverId)
      );

      if (connection) {
        connection.status = "true";
      }

      await userProfile.save();
      console.log(connection);

      const userProfile2: userDetails | null = await UserModel.findById(
        receiverId
      );

      if (!userProfile2) {
        // No profile found for the user
        return null;
      }

      const connection2: userProfileConnection = userProfile2.connections.find(
        (conn) => conn.userId && conn.userId.equals(senderId)
      );

      if (connection2) {
        connection2.status = "true";
      }

      await userProfile2.save();

      const notification = await notificationModel
        .findOne({
          senderId: senderId,
          receiverId: receiverId,
        })
        .populate("receiverId", "nickName , imageUrl");

      if (!notification) {
        console.log("Notification not found");
        return null;
      }

      notification.status = "true";

      notification.message = "both are connected";

      const updatedNotification = await notification.save();

      if (updatedNotification == undefined) {
        return null;
      }

      return updatedNotification.toObject();
    } catch (error) {
      throw error;
    }
  }

  async connectionRequest(
    userName: string,
    senderId: string,
    receiverId: string
  ): Promise<senderNotification> {
    const senderObjectId = new Types.ObjectId(senderId);
    const receiverObjectId = new Types.ObjectId(receiverId);

    const userFirst = await UserModel.findOneAndUpdate(
      { _id: senderObjectId, "connections.userId": receiverObjectId },
      { $set: { "connections.$.status": "pending" } },
      { new: true }
    );
    const userSecond = await UserModel.findOneAndUpdate(
      { _id: receiverObjectId, "connections.userId": senderObjectId },
      { $set: { "connections.$.status": "Accept" } },
      { new: true }
    );

    if (!userFirst) {
      await UserModel.findByIdAndUpdate(
        senderId,
        {
          $push: {
            connections: {
              userId: receiverId,
            },
          },
        },
        { new: true } // This option returns the updated document
      );
    }

    if (!userSecond) {
      await UserModel.findByIdAndUpdate(
        receiverId,
        {
          $push: {
            connections: {
              userId: senderId,
              status: "Accept",
            },
          },
        },
        { new: true } // This option returns the updated document
      );
    }

    console.log("finding finding finding finding ");
    const findNotification: NotificationType | null =
      await notificationModel.findOne({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });

    if (findNotification) {
      (findNotification.senderId = senderObjectId),
        (findNotification.receiverId = receiverObjectId);
      findNotification.type = "connect";
      findNotification.message = `${userName} wants to connect with you.`;

      const saved = await findNotification.save();
      const save: senderNotification = await saved.populate("senderId");

      return save;
    } else {
      const notification = await new notificationModel({
        senderId,
        receiverId,
        type: "connect",
        message: `${userName} wants to connect with you.`,
      });

      const savedNotification = await notification.save();
      const save: senderNotification = await savedNotification.populate(
        "senderId"
      );
      console.log("saved");
      console.log(save);
      console.log(savedNotification);

      return save;
    }
  }

  async RcheckConnectionStatus(
    userId: ObjectId,
    receiverId: ObjectId
  ): Promise<statusUpdate | string | null> {
    try {
      const userProfile: userList | null = await UserModel.findById(userId);

      if (!userProfile) {
        // No profile found for the user
        return null;
      }

      const connection: statusUpdate = userProfile.connections.find(
        (conn) => conn.userId && conn.userId.equals(receiverId)
      );

      if (connection) {
        return connection;
      }

      return "false";
    } catch (error) {
      throw error;
    }
  }

  async RgetProfileDetails(
    userId: Schema.Types.ObjectId
  ): Promise<userList | null> {
    try {
      const response = await UserModel.findById(userId);

      if (response) {
        return response.toObject();
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async RUnConnectUser(
    delteSenderId: string,
    deleteReceiverId: string
  ): Promise<NotificationType | null> {
    try {
      await UserModel.findOneAndUpdate(
        { _id: delteSenderId, "connections.userId": deleteReceiverId },
        { $set: { "connections.$.status": "false" } }
      );
      await UserModel.findOneAndUpdate(
        { _id: deleteReceiverId, "connections.userId": delteSenderId },
        { $set: { "connections.$.status": "false" } }
      );

      const findNotification: NotificationType | null =
        await notificationModel.findOne({
          $or: [
            { senderId: delteSenderId, receiverId: deleteReceiverId },
            { senderId: deleteReceiverId, receiverId: delteSenderId },
          ],
        });

      if (!findNotification) {
        return null;
      }
      if (findNotification) {
        findNotification.message = "both are unConnected";
      }

      findNotification.save();

      return findNotification;
    } catch (error) {
      throw error;
    }
  }

  async findUserDetails(
    id: Schema.Types.ObjectId
  ): Promise<notificationDisplayDetails | null> {
    try {
      const response = await UserModel.findOne(
        { _id: id },
        "imageUrl nickName"
      );

      if (!response) {
        return null;
      }

      return response?.toObject();
    } catch (error) {
      throw error;
    }
  }

  // firebase integration for push Notification

  async RStorePushNotification(value: fcmSubscription): Promise<boolean> {
    let cornJon: any = null;

    await SubscriptionModel.create(value);

    interface modelSubscriptions {
      endpoint: string;
      expirationTime: Date | null;
      keys: {
        p256dh: string;
        auth: string;
      };
    }

    const sendNotification = async () => {
      try {
        const subscriptions: fcmSubscription[] = await SubscriptionModel.find(
          {}
        );

        subscriptions.map((subscription: fcmSubscription) => {
          const endpointParts = subscription.endpoint.split("/");
          return endpointParts[endpointParts.length - 1];
        });

        if (subscriptions.length == 0) {
          cornJon.stop();
        }

        const notificationPromises = subscriptions.map((subscription) => {
          const payload = JSON.stringify({
            title: "Neay by chat",
            body: "lot of users are there nearby go on ",
          });

          return webpush
            .sendNotification(subscription, payload)
            .then(() => console.log("Notification sent successfully"))
            .catch((error) =>
              console.error("Error sending notification:", error)
            );
        });

        await Promise.all(notificationPromises);
      } catch (error) {
        throw error;
      }
    };

    // Schedule the task to run every 10 seconds
    cornJon = cron.schedule(
      "*/10 * * * * *",
      async () => {
        await sendNotification();
      },
      {
        timezone: "UTC", // Optional: Specify the timezone if different from UTC
      }
    );

    return true;
  }

  async RUnsubscribeNotification(value: fcmSubscription): Promise<boolean> {
    try {
      const deletedSubscription = await SubscriptionModel.findOneAndDelete({
        endpoint: value.endpoint,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }

  async RGetRandomProfileDetails(value: string): Promise<userList | null> {
    try {
      const profileDetails = await UserModel.findById(value);

      if (!profileDetails) {
        return null;
      }

      return profileDetails.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RfindBlockUnblockDetails(
    chatRoomId: ObjectId,
    userId: ObjectId
  ): Promise<boolean> {
    const Id = userId.toString();

    const response: IChatroom | null = await chatRoomModel.findOne({
      _id: { $in: chatRoomId },
      "members.userId": userId,
    });

    if (!response) {
      return false;
    }

    const status = response.members.find((a, b) => {
      const str = a.userId.toString();

      if (str == Id) {
        return a;
      }
    });

    if (status == undefined) {
      return false;
    }
    return status.status;
  }

  async RpaymentSummary(
    subId: string,
    userId: string,
    paymentId: string,
    orderId: string
  ): Promise<paymentSummary> {
    try {
      const userDetails = await UserModel.findById(userId);
      const searchSubscriptionDetails = await searchSubscriptionModel.findById(
        subId
      );

      // const currentCountofSearch=userDetails?.maxSearch
      const inSubscriptionCount = searchSubscriptionDetails?.maxCount;
      // const totalCount=currentCountofSearch+inSubscriptionCount

      const updateUserDetails = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { maxSearch: inSubscriptionCount } }
      );

      const searchSubscriptionPaymentSummary = {
        userId: userDetails?._id,
        userName: userDetails?.userName,
        nickName: userDetails?.nickName,
        imageUrl: userDetails?.imageUrl,
        gender: userDetails?.gender,
        email: userDetails?.email,
        dob: userDetails?.dob,
        subscriptionName: searchSubscriptionDetails?.name,
        maxCount: searchSubscriptionDetails?.maxCount,
        price: searchSubscriptionDetails?.price,
        timePeriod: searchSubscriptionDetails?.timePeriod,
        searchSubUrl: searchSubscriptionDetails?.imageUrl,
        description: searchSubscriptionDetails?.description,
        paymentStatus: "sucess",
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
      };

      const response = await paymentSummaryModel.create(
        searchSubscriptionPaymentSummary
      );

      response.save();

      return response.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RincrementSearchCount(userId: string): Promise<userDetails | null> {
    try {
      const updateUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { currSearch: 1 } }
      );

      if (!updateUser) {
        return null;
      }

      return updateUser.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RdisplayProfileDetails(userId: string): Promise<userList | null> {
    try {
      const response = await UserModel.findById(userId);

      if (!response) {
        return null;
      }

      return response?.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RuploadUserProfileImage(
    userId: string,
    imageUrl: string
  ): Promise<userList | null> {
    try {
      const resposne = await UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { images: imageUrl } },
        { new: true }
      );

      if (!resposne) {
        return null;
      }

      return resposne?.toObject();
    } catch (error) {
      throw error;
    }
  }

  async RdeleteProfileImage(userId: string, index: number): Promise<boolean> {
    try {
      const user: userDetails | null = await UserModel.findById(userId);

      if (user) {
        user.images.splice(index, 1);

        await user.save();

        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }
}
