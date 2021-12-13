import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = (props) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);
  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
    changeButtonStatus(true);
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeResultsDisplay(true);
  };

  return (
    <Container>
      <Row>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate1URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  {candidate1Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button disabled={buttonStatus} onClick={() => addVote(0)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
        <Col className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#c4c4c4",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
            }}
          >
            {prompt}
          </div>
        </Col>
        <Col className='jutify-content-center d-flex'>
          <Container>
            <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "3vw",
                }}
              >
                <img
                  style={{
                    height: "35vh",
                    width: "20vw",
                  }}
                  src={candidate2URL}
                ></img>
              </div>
            </Row>
            {showresults ? (
              <Row
                className='justify-content-center d-flex'
                style={{ marginTop: "5vh" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    padding: "10px",
                    backgroundColor: "#c4c4c4",
                  }}
                >
                  {candidate2Votes}
                </div>
              </Row>
            ) : null}
            <Row
              style={{ marginTop: "5vh" }}
              className='justify-content-center d-flex'
            >
              <Button disabled={buttonStatus} onClick={() => addVote(1)}>
                Vote
              </Button>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PollingStation;
