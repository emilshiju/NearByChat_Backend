import locationModel from "../../frameWorks/mongodb/models/userLocation";

export class locationRepository {
  async saveLocation(data: any, userId: string, radius: number) {
    try {
      const checkUserLocation = await locationModel.find({ userId: userId });

      await locationModel.findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            "location.type": "Point", // Set GeoJSON type
            "location.coordinates": [data.longitude, data.latitude],
            radius: radius,
          },
        },
        { upsert: true, new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
