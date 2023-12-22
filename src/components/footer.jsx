import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

const MyFooter = () => {
  return (
    <footer className="bg-dark">
      <Container>
        <Row className="text-center mt-5 ">
          <Col md={{ span: 6, offset: 3 }}>
            <Row>
              <Col xs={12} className="text-left mb-2">
                <FontAwesomeIcon icon={faFacebook} className="footer-icon text-white" alt="Facebook"/>
                <FontAwesomeIcon icon={faInstagram} className="footer-icon text-white" alt="Instagram"/>
                <FontAwesomeIcon icon={faTwitter} className="footer-icon text-white" alt="Twitter"/>
                <FontAwesomeIcon  icon={faYoutube} className="footer-icon text-white" alt="YouTube"/>
              </Col>
            </Row>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-4">
              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Audio and Subtitles
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Media Center
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Privacy
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Contact us
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Audio Description
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Investor Relations
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Legal Notices
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Help Center
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Jobs
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Cookie Preferences
                    </a>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="footer-links">
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Gift Cards
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Terms of Use
                    </a>
                  </p>
                  <p>
                    <a href="#" alt="footer link" className="text-white">
                      Corporate Information
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col xs={12} className="text-left mb-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="footer-button rounded-0 mt-3 text-white"
                >
                  Service Code
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-left mb-2 mt-2 copyright text-white">
                &copy; 1997-2023 Netflix, Inc.
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
