import User from "../models/user";

export const hire = async (req, res) => {
  try {
    const user = await User.find({
      freelance: {
        $eq: "yes",
      },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};
