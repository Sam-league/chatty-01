import ListModel from "../models/listModel.js";
import RequestModel from "../models/requestModel.js";
import RoomModel from "../models/roomModel.js";
import UserModel from "../models/userModel.js";

class UserControllers {
  // sign up---------------------------------------------------------
  signup = async (req, res) => {
    try {
      const data = await UserModel.create(req.body);
      const list = await ListModel.create({ user_id: data._id });
      res.status(200).send({
        status: true,
        message: "signed up successfully",
        response: data,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };

  // Login--------------------------------------------------------
  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await UserModel.findOne({ email });
      if (!data) throw new Error("email doesn't exist");
      if (data.password !== password) throw new Error("password is incorrect");
      res.status(200).send({
        status: true,
        message: "logged in successfully",
        response: data,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };

  // fetch new Profiles ----------------------------------------
  fetchProfile = async (req, res) => {
    try {
      const list = await ListModel.findOne({ user_id: req.params._id });
      console.log("list", list);
      const data = await UserModel.find({
        $nor: [{ _id: req.params._id }],
      }).select("-password");

      const requests = await RequestModel.find({ request_id: req.params._id });

      const result = data.map((v) => {
        let check = requests.find(
          (r) => r.user_id.toString() == v._id.toString()
        );
        let checkList = list.list.find((p) => p.friend_id === v._id);
        if (checkList) return false;
        return check
          ? { _id: v._id, name: v.name, email: v.email, status: check.status }
          : v;
      });

      res.status(200).send({
        status: true,
        message: "Profiles fetched successfully",
        count: data.length,
        response: result,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };

  // fetch requests -------------------------------------------------
  fetchRequest = async (req, res) => {
    try {
      const { user_id } = req.params;
      const data = await RequestModel.find({ user_id }).populate("request_id");
      res.status(200).send({
        status: true,
        message: "requests fetched successfully!",
        response: data,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };

  // send Requests -----------------------------------------------------
  sendRequests = async (req, res) => {
    try {
      const request = await RequestModel.create(req.body);
      res.status(201).send({
        status: true,
        message: "request sent successfully",
        response: request,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };

  // accept Request -----------------------------------------------------
  acceptRequest = async (req, res) => {
    try {
      const { _id } = req.params;
      const data = await RequestModel.findOneAndDelete({ _id }).populate(
        "request_id"
      );
      const list = await ListModel.updateOne(
        { user_id: data.user_id },
        {
          $push: {
            list: {
              friend_id: data.request_id._id,
              name: data.request_id.name,
            },
          },
        }
      );
      const room = await RoomModel.create({
        user_1: data.user_id,
        user_2: data.request_id._id,
      });
      res.status(200).send({
        status: true,
        message: "request accepted!",
        response: data,
      });
    } catch (error) {
      res.status(401).send({
        status: false,
        message: error.message,
      });
    }
  };
}

const UserController = new UserControllers();

export default UserController;
