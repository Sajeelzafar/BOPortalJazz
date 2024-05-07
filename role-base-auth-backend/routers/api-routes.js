const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { exec } = require("child_process");
const jwt = require("jsonwebtoken");
const { shell } = require("electron");
const asyncHandler = require("express-async-handler");
const {
  getUser,
  createUser,
  updateUser,
  createRole,
  getUserRole,
  getRole,
  getAllRoles,
  getAllUsers,
  editRolename,
  deleterole,
  createOTP,
  getOTP,
  getAllPartners,
  billProcessing,
  previousBillEntries,
  createPartner,
  offlinePartners,
  deletePartner,
  updatePartner,
  getauditlogs,
  getfilelogs,
  fileDetailsAdd,
  getDependentUsersList,
  getPartner,
  auditlogsAdd,
  editUsername,
  deleteUser,
  editPermissions,
} = require("../database");
const otp_service = require("./otp_service");
const verifyJWT = require("../middleware/verifyJWT");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadFile = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/register", async (req, res) => {
  // Check if the username already exists in the database
  const existingUser = await getUser(req.body.user);

  if (existingUser) {
    return res
      .status(409)
      .json({ status: 409, msg: "Username already exists" });
  }

  // If the username is unique, proceed with user creation
  try {
    const user = await createUser(
      req.body.user,
      req.body.pwd,
      req.body.email,
      req.body.phoneNumber
    );
    if (user) {
      res.status(201).json({ msg: "User created successfully" });
    } else {
      res.status(501).json({ msg: "Incorrect format of details" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/auth", async (req, res) => {
  // Check if the username exists in the database
  const user = await getUserRole(req.body.user);
  if (req.body.user === "" || req.body.pwd === "") {
    return res.status(400).json({ msg: "Missing username or password" });
  }

  if (user) {
    if (user.password === req.body.pwd) {
      //New Code
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: user.username,
            role: user.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );

      const refreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      // Create secure cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });

      // Send accessToken containing username and roles
      //New Code
      return res.status(200).json({ accessToken, user });
    }
    return res.status(401).json({ msg: "Unauthorized" });
  }

  res.status(401).json({ msg: "Unauthorized" });
});

// router.use(verifyJWT);

router.post("/user", async (req, res) => {
  // Check if the username already exists in the database
  const existingUser = await getUserRole(req.body.username);
  if (existingUser) {
    return res.status(201).json(existingUser);
  }
  return res.status(404).json({ msg: "User not found" });
});

router.post("/newrole", async (req, res) => {
  try {
    const { rolename, createdBy, permissions } = req.body;
    const existingRole = await getRole(rolename);

    if (existingRole) {
      return res.status(409).json({ status: 409, msg: "Role already exists" });
    }
    const formattedPermissions =
      "[" + permissions.map((permission) => `"${permission}"`).join(", ") + "]";
    await createRole(rolename, createdBy, formattedPermissions);
    const role = await getRole(rolename);
    return res.status(201).json(role);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    await updateUser(req.body.role_id, req.body.username);
    const user = await getUserRole(req.body.username);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/role", async (req, res) => {
  const existingrole = await getRole(req.body.role);
  if (existingrole) {
    return res.json({ status: 201, msg: "Role already exists" });
  }
  return res.json({ status: 404, msg: "Role not found" });
});

router.get("/users", async (req, res) => {
  const allusers = await getAllUsers();
  return res.json(allusers);
});

router.get("/roles", async (req, res) => {
  const allroles = await getAllRoles();
  return res.json(allroles);
});

router.get("/partners", async (req, res) => {
  const allpartners = await getAllPartners();
  return res.json(allpartners);
});

router.post("/deleterole", async (req, res) => {
  try {
    const { roleId } = req.body;
    const deletedrole = await deleterole(roleId);
    if (deletedrole === 0) {
      return res.json({ status: 200, msg: "Resource deleted successfully" });
    } else {
      return res.json({ status: 409, msg: "Resource has dependencies" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/editusername", async (req, res) => {
  try {
    const { prevName, newName } = req.body;
    const existingUser = await getUser(newName);
    if (existingUser) {
      return res.json({
        status: 409,
        msg: "Username already exists",
      });
    } else {
      try {
        await editUsername(prevName, newName);
        return res.json({ status: 201, msg: "User name changed successfully" });
      } catch (error) {
        return res.json({
          status: 409,
          msg: "Error Updating user, username format incorrect",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/deleteuser", async (req, res) => {
  try {
    await deleteUser(req.body.userId);
    return res.json({ status: 201, msg: "User successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, msg: "Internal Server Error" });
  }
});

router.post("/editrolepermissions", async (req, res) => {
  try {
    const { id, rolename, permissions } = req.body;
    if (permissions) {
      try {
        const permissionsUpdate = await editPermissions(id, permissions);
        return res.status(200).json({
          ...permissionsUpdate,
          msg: "Permissions changed successfully",
        });
      } catch (error) {
        return res.json({
          status: 409,
          msg: "Failed to update permissions",
        });
      }
    }
    const existingRole = await getRole(rolename);
    if (existingRole) {
      return res.json({
        status: 409,
        rolename: rolename,
        msg: "Rolename already exists",
      });
    } else {
      const editRole = await editRolename(rolename, id);
      return res.status(201).json({
        ...editRole,
        status: 200,
        msg: "Role name changed successfully",
      });
    }
  } catch (e) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/otpgenerate", async (req, res) => {
  try {
    const otp_details = await otp_service.generateOTP();
    const otp_entry = await createOTP(otp_details);
    otp_service.sendOTP(otp_details, req.body);
    return res.json({
      status: 201,
      msg: "OTP generated successfully",
      otp_id: otp_entry.insertId,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/otpverify", async (req, res) => {
  try {
    const input_otp = req.body;
    const actual_otp = await getOTP(input_otp.id);
    const otp_verificationMessage = await otp_service.verifyOTP(
      input_otp,
      actual_otp
    );
    res.json({
      status: 201,
      msg: otp_verificationMessage,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.post("/billsUpload", upload.single("file"), async (req, res) => {
  try {
    const { buffer } = req.file;
    const company_detail = await getPartner(req.body.companyId);
    const { Company_Code, Company_Name } = company_detail;

    // Convert buffer to string (assuming it's a text/csv file)
    const fileContent = buffer.toString("utf-8");
    const rows = fileContent
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    const cleanedRows = rows.map((row) =>
      row.map((element, index) =>
        index === row.length - 1 ? element.trim() : element
      )
    );
    let columns = cleanedRows[0];
    columns = columns.concat("COMPANY_CODE", "COMPANY_NAME");
    let successResponses = 0;
    let duplicateResponses = 0;
    for (let i = 1; i < cleanedRows.length; i++) {
      let values = cleanedRows[i];
      try {
        const prevEntries = await previousBillEntries(values);
        if (prevEntries.length === 0) {
          values = values.concat(Company_Code, Company_Name);
          try {
            const insertion = await billProcessing(columns, values);

            if (insertion) {
              successResponses += 1;
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          duplicateResponses += 1;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (successResponses === rows.length) {
      return res.json({
        msg: `All ${successResponses} were uploaded in database`,
      });
    } else if (successResponses > 0) {
      return res.json({
        msg: `${successResponses} were uploaded, ${
          rows.length - successResponses - duplicateResponses - 1
        } had format issue in them. Duplicate responses were ${duplicateResponses}`,
      });
    }
    return res.json({ msg: "Error, no records updated" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

router.post("/partneradd", async (req, res) => {
  try {
    await createPartner(req.body);
    return res.json({ status: 200, msg: "Partner successfully added" });
  } catch (error) {
    return res.json({ status: 400, msg: "Incorrect format" });
  }
});

router.post("/partnerdelete", async (req, res) => {
  try {
    await deletePartner(req.body.selectedPartner);
    return res.json({ status: 200, msg: "Partner successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, msg: "Internal Server Error" });
  }
});

router.post("/partnerupdate", async (req, res) => {
  try {
    await updatePartner(req.body.updatePartnerData);
    return res.json({ status: 200, msg: "Partner successfully updated" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 400, msg: "Incorrect format" });
  }
});

router.get("/offlinePartners", async (req, res) => {
  try {
    const listOfOfflinePartners = await offlinePartners();
    return res.json(listOfOfflinePartners);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

router.post("/fileDetailsAdd", uploadFile.single("file"), async (req, res) => {
  try {
    const fileData = JSON.parse(req.body.fileData);
    const fileName = req.file.filename;
    const timestampFile = Date.now();
    const newDirectory = `uploads/${timestampFile}`;
    const newPath = `${newDirectory}/${fileData.name}`;
    if (!fs.existsSync(newDirectory)) {
      fs.mkdirSync(newDirectory, { recursive: true });
    }
    fs.renameSync(req.file.path, newPath);
    const fileDetails = await fileDetailsAdd(fileData, newPath);
    return res.json(fileDetails);
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

router.post("/getdependency", async (req, res) => {
  try {
    const dependentUsersList = await getDependentUsersList(req.body.id);
    return res.json(dependentUsersList);
  } catch (error) {
    return res.json({ msg: "Internal Server Error" });
  }
});

router.post("/auditlogs", async (req, res) => {
  try {
    const auditentry = await auditlogsAdd(req.body);
    return res.json({ msg: "Audit Entry Successful" });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

router.get("/auditlogs", async (req, res) => {
  try {
    const auditlogs = await getauditlogs(req.body);
    return res.json({ auditlogs });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

router.get("/filelogs", async (req, res) => {
  try {
    const filelogs = await getfilelogs(req.body);
    return res.json({ filelogs });
  } catch (error) {
    console.log(error);
    return res.json({ msg: "Internal Server Error" });
  }
});

const ROOT_DIR = path.join(__dirname, "../");

router.get("/download/uploads/:filePathFolder/:filePathURL", (req, res) => {
  const { filePathFolder, filePathURL } = req.params;
  const folder = path.win32.join(ROOT_DIR, "/uploads", filePathFolder);
  fs.access(folder, fs.constants.F_OK, (err) => {
    if (err) {
      return res.json({ msg: "Folder not found" });
    }
    exec(`start "" "${folder}"`, (error) => {
      if (error) {
        return res.json({ msg: "Error opening folder" });
      }
      return res.json({ msg: "Folder Opened Successfully" });
    });
  });
});

module.exports = router;
