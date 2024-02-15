import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import ShowPartners from "../partner_manage/ShowPartners";
import Popup from "../Popup";
import { ToastContainer, toast } from "react-toastify";
import NewPartner from "../partner_manage/NewPartner";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const GETALLPARTNERS = "/api/partners";
const AUDIT_LOGS = "/api/auditlogs";

const Partner_Manage = () => {
  const { auth } = useAuth();
  const [newPartner, setNewPartner] = useState(false);
  const [partners, setPartners] = useState([]);
  const [searchType, setSearchType] = useState("ALL");
  const [searchValue, setSearchValue] = useState("");
  const [searchTypeEnable, setSearchTypeEnable] = useState(false);
  const [searchEnable, setSearchEnable] = useState(true);

  const getAllPartners = async () => {
    await axios
      .get(GETALLPARTNERS)
      .then((response) => {
        setPartners(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePartnerWindow = async (
    status = "",
    msg = "",
    msg_context = ""
  ) => {
    if (msg !== "") {
      let readsuccess = false;
      status === 200 ? (readsuccess = true) : (readsuccess = false);
      toast(msg);
      try {
        await axios.post(
          AUDIT_LOGS,
          JSON.stringify({
            username: auth?.user,
            action: "Partner",
            success: readsuccess,
            message_context: msg_context,
          })
        );
      } catch (error) {
        console.log("Partner audit log error:", error);
      }
    }
    setNewPartner(false);
    await getAllPartners();
  };

  const handleSearchTypeChange = (event) => {
    if (event.target.value === "company_type") {
      setSearchTypeEnable(true);
    } else {
      setSearchValue(""); //Refreshes value after the type is changed
      setSearchTypeEnable(false);
    }
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClearClick = async () => {
    await getAllPartners();
    setSearchEnable(true);
  };

  const handleSearchClick = async () => {
    setSearchEnable(false);
    switch (searchType) {
      case "ALL":
        const filteredPartnersALL = partners.filter((partner) => {
          return Object.values(partner).some((value) =>
            String(value).toLowerCase().includes(searchValue.toLowerCase())
          );
        });
        setPartners(filteredPartnersALL);
        break;

      case "company_code":
        const filteredPartnersCC = partners.filter((partner) => {
          const companyCodeAsString = String(partner.company_code);
          return companyCodeAsString.includes(searchValue);
        });
        setPartners(filteredPartnersCC);
        break;

      case "company_name":
        const filteredPartnersCN = partners.filter((partner) =>
          partner.company_name.includes(searchValue)
        );
        setPartners(filteredPartnersCN);
        break;

      case "partial_payment":
        const filteredPartnersPP = partners.filter(
          (partner) => partner.partial_payment === Number(searchValue)
        );
        setPartners(filteredPartnersPP);
        break;

      case "min_amount":
        const filteredPartnersMinA = partners.filter(
          (partner) => partner.min_amount === Number(searchValue)
        );
        setPartners(filteredPartnersMinA);
        break;

      case "max_amount":
        const filteredPartnersMaxA = partners.filter(
          (partner) => partner.max_amount === Number(searchValue)
        );
        setPartners(filteredPartnersMaxA);
        break;

      case "company_type":
        const filteredPartnersCT = partners.filter((partner) =>
          partner.company_type.includes(searchValue)
        );
        setPartners(filteredPartnersCT);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getAllPartners();
  }, []);

  return (
    <Container fluid>
      <ToastContainer />
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Card.Title as="h4">Partner Management</Card.Title>
                <p className="card-category">
                  You can edit partner details here
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <select
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  style={{
                    padding: "8px",
                    marginRight: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <option value="ALL">ALL</option>
                  <option value="company_code">Company Code</option>
                  <option value="company_name">Company Name</option>
                  <option value="partial_payment">Partial Payment</option>
                  <option value="min_amount">Min Amount</option>
                  <option value="max_amount">Max Amount</option>
                  <option value="pool_account">Pool Account</option>
                  <option value="notification_template">
                    Notification Template
                  </option>
                  <option value="company_type">Company Type</option>
                </select>
                {searchTypeEnable ? (
                  <select
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    disabled={!searchEnable}
                    style={{
                      padding: "8px",
                      marginRight: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="Generic">Generic</option>
                    <option value="NonGeneric">NonGeneric</option>
                    <option value="Offline">Offline</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    disabled={!searchEnable}
                    style={{
                      padding: "8px",
                      marginRight: "10px",
                      borderRadius: "4px",
                      flex: "1",
                    }}
                  />
                )}
                {searchEnable ? (
                  <Button onClick={handleSearchClick}>Search</Button>
                ) : (
                  <Button onClick={handleClearClick}>Clear</Button>
                )}
              </div>
              <Button onClick={() => setNewPartner(true)}>
                Add a new partner
              </Button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <ShowPartners
                handlePartnerWindow={handlePartnerWindow}
                partners={partners}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Popup show={newPartner} onHide={handlePartnerWindow}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Partner Form
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewPartner handlePartnerWindow={handlePartnerWindow} />
        </Modal.Body>
      </Popup>
    </Container>
  );
};

export default Partner_Manage;
