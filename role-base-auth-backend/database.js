const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: Infinity, // Set the limit to Infinity
    queueLimit: 0,
    connectTimeout: 0,
  })
  .promise();

async function getAllUsers() {
  try {
    const [rows] = await pool.query(`
      SELECT users.*, roles.role, roles.permissions
      FROM users
      JOIN roles ON users.role_id = roles.id;
      `);
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getDependentUsersList(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * FROM users where role_id = ?
    `,
      [id]
    );
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getAllRoles() {
  try {
    const [rows] = await pool.query("select * from roles");
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getAllPartners() {
  try {
    const [rows] = await pool.query("select * from partner_detail");
    return rows;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getPartner(id) {
  try {
    const [rows] = await pool.query("select * from partner_detail WHERE id=?", [
      id,
    ]);
    return rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getUser(username) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM users
      WHERE username = ?
      `,
      [username]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getRole(role) {
  try {
    const [rows] = await pool.query(
      `
        SELECT * 
        FROM roles
        WHERE role = ?
        `,
      [role]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getUserRole(username) {
  try {
    const [rows] = await pool.query(
      `
        SELECT users.*, roles.role, roles.role_datetime, roles.createdby, roles.permissions
        FROM users
        INNER JOIN roles ON users.role_id = roles.id
        WHERE users.username = ?;
      `,
      [username]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function createUser(username, password, email, phoneNumber) {
  try {
    const currentdatetime = new Date();
    const [result] = await pool.query(
      `
        INSERT INTO users (username, password, email, phoneNumber, user_datetime, role_id)
        VALUES (?, ?, ?, ?, ?, 2)
        `,
      [
        username,
        password,
        email,
        phoneNumber,
        currentdatetime.toISOString().slice(0, 19).replace("T", " "),
      ]
    );
    return result;
  } catch (error) {
    console.log("Error creating user:", error);
    return error;
  }
}

async function createRole(role, createdBy, permissions) {
  try {
    const currentdatetime = new Date();
    const [result] = await pool.query(
      `
          INSERT INTO roles (role, createdBy, permissions, role_datetime)
          VALUES (?, ?, ?, ?)
          `,
      [
        role,
        createdBy,
        permissions,
        currentdatetime.toISOString().slice(0, 19).replace("T", " "),
      ]
    );
    return result;
  } catch (error) {
    console.log("Error creating user:", error);
    return error;
  }
}

async function updateUser(role_id, username) {
  try {
    const [result] = await pool.query(
      `
        UPDATE users
        SET role_id = ?
        WHERE username = ?
      `,
      [role_id, username]
    );
    const updatedUser = getUserRole(username);
    return updatedUser;
  } catch (error) {
    // Handle the error, log it, or throw it again if needed.
    console.error("Error updating user:", error);
    throw error;
  }
}

async function deleterole(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM users
      WHERE role_id = ?
      `,
      [id]
    );
    if (rows.length === 0) {
      const [result] = await pool.query(
        `DELETE FROM roles
      WHERE id = ?
      `,
        [id]
      );
      return rows.length;
    } else {
      return rows.length;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function editUsername(prevName, newName) {
  try {
    const [result] = await pool.query(
      `UPDATE users
      SET username = ?
      WHERE username = ?
      `,
      [newName, prevName]
    );
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function editRolename(rolename, id) {
  try {
    const [result] = await pool.query(
      `UPDATE roles
    SET role = ?
    where id = ?
    `,
      [rolename, id]
    );
    const role = getRole(rolename);
    return role;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function editPermissions(id, permissions) {
  try {
    const [result] = await pool.query(
      `UPDATE roles
    SET permissions = ?
    where id = ?
    `,
      [JSON.stringify(permissions), id]
    );
    // const role = getRole(rolename);
    return result;
  } catch (error) {
    console.log(error);
    return "Error updating result";
  }
}

async function createOTP(otp_details) {
  const { sms_otp, email_otp, expiration_time } = otp_details;
  try {
    const [result] = await pool.query(
      `
          INSERT INTO otps (sms_otp, email_otp, expiration_time, verified)
          VALUES (?, ?, FROM_UNIXTIME(?), ?)
          `,
      [sms_otp, email_otp, expiration_time, false]
    );
    return result;
  } catch (error) {
    console.log("Error creating user:", error);
    return error;
  }
}

async function getOTP(otp_id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT * 
      FROM otps
      WHERE id = ?
      `,
      [otp_id]
    );
    return rows[0];
  } catch (error) {
    console.log("Error finding OTP:", error);
    return error;
  }
}

async function billProcessing(columns, values) {
  try {
    const [result] = await pool.query(
      `INSERT INTO bill_processing_import (${columns.join(
        ", "
      )}) VALUES ('${values.join("', '")}');`
    );
    if (result.affectedRows !== 1) {
      throw new Error("Failed to insert data");
    }
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to insert data");
  }
}

async function previousBillEntries(values) {
  try {
    const [result] = await pool.query(
      `SELECT * FROM bill_processing_import 
      WHERE CONSUMER_NO = ? AND NAME_OF_CONSUMER = ? AND BILLING_MONTH = ?
      AND AMOUNT_BEFORE_DUE_DATE = ? AND AMOUNT_AFTER_DUE_DATE = ? AND DUE_DATE = ?`,
      // `SELECT CONSUMER_NO, NAME_OF_CONSUMER, BILLING_MONTH, AMOUNT_BEFORE_DUE_DATE,
      //  AMOUNT_AFTER_DUE_DATE, DUE_DATE
      //  FROM bill_processing_import WHERE CONSUMER_NO = ?`,
      [values[0], values[1], values[2], values[3], values[4], values[5]]
    );
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to insert data");
  }
}

async function verifyUser(id) {
  try {
    const [result] = await pool.query(
      `UPDATE otps
    SET verified = TRUE
    where id = ?
    `,
      [id]
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function createPartner({
  companyCode,
  companyName,
  companyTopic,
  endpointURLInquiry,
  endpointURLPaybill,
  serviceContextInquiry,
  serviceContextPaybill,
  username,
  password,
  MI_SVC,
  serviceName,
}) {
  try {
    const [result] = await pool.query(
      `
          INSERT INTO partner_detail (Company_Code, Company_Name, Company_Topic, Endpoint_URL_Inquiry, Endpoint_URL_Paybill, Service_Context_Inquiry, Service_Context_paybill, Username, Password, MI_SVC, Service_Name)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
      [
        companyCode,
        companyName,
        companyTopic,
        endpointURLInquiry,
        endpointURLPaybill,
        serviceContextInquiry,
        serviceContextPaybill,
        username,
        password,
        MI_SVC,
        serviceName,
      ]
    );
    return result;
  } catch (error) {
    throw new Error("Failed to create user:", error);
  }
}

async function offlinePartners() {
  try {
    const [result] = await pool.query(
      `SELECT * FROM partner_detail WHERE company_type=?`,
      ["offline"]
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deletePartner({ id, company_code, company_name }) {
  try {
    const [result] = await pool.query(
      "DELETE FROM partner_detail WHERE id=? AND company_code=? AND company_name=?",
      [id, company_code, company_name]
    );
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteUser(id) {
  try {
    const [result] = await pool.query(" DELETE FROM users WHERE id = ? ", [id]);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function updatePartner(updatePartnerData) {
  try {
    const updateQuery = `
      UPDATE partner_detail
      SET 
        company_code = ?,
        company_name = ?,
        partial_payment = ?,
        min_amount = ?,
        max_amount = ?,
        pool_account = ?,
        notification_template = ?,
        company_type = ?
      WHERE id = ?;
    `;

    const values = [
      updatePartnerData.company_code,
      updatePartnerData.company_name,
      updatePartnerData.partial_payment,
      updatePartnerData.min_amount,
      updatePartnerData.max_amount,
      updatePartnerData.pool_account,
      updatePartnerData.notification_template,
      updatePartnerData.company_type,
      updatePartnerData.id,
    ];

    const [result] = await pool.query(updateQuery, values);
    return result;
  } catch (error) {
    console.error(`Error updating row: ${error.message}`);
    throw error;
  }
}

async function fileDetailsAdd(fileDetails) {
  const currentdatetime = new Date();
  try {
    const [result] = await pool.query(
      `
          INSERT INTO fileUploadDetail (name, type, size_bytes, user_id, user, upload_dateTime)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
      [
        fileDetails.name,
        fileDetails.type,
        fileDetails.size,
        fileDetails.id,
        fileDetails.user,
        currentdatetime.toISOString().slice(0, 19).replace("T", " "),
      ]
    );
  } catch (error) {
    console.error(`Error adding file: ${error.message}`);
    throw error;
  }
}
async function auditlogsAdd(auditLogDetail) {
  const { username, action, success, message_context } = auditLogDetail;
  try {
    const [result] = await pool.query(
      `
          INSERT INTO audit_logs (username, action, success, message_context)
          VALUES (?, ?, ?, ?)
          `,
      [username, action, success, message_context]
    );
    return result;
  } catch (error) {
    console.error(`Error adding audit: ${error.message}`);
    throw error;
  }
}
async function getauditlogs() {
  try {
    const [result] = await pool.query(`SELECT * FROM audit_logs`);
    return result;
  } catch (error) {
    console.error(`Error getting audit logs: ${error.message}`);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUserRole,
  createRole,
  getRole,
  updateUser,
  deleteUser,
  getAllRoles,
  editRolename,
  editPermissions,
  editUsername,
  deleterole,
  createOTP,
  getOTP,
  verifyUser,
  getAllPartners,
  billProcessing,
  previousBillEntries,
  createPartner,
  offlinePartners,
  deletePartner,
  updatePartner,
  fileDetailsAdd,
  getDependentUsersList,
  getPartner,
  auditlogsAdd,
  getauditlogs,
};
