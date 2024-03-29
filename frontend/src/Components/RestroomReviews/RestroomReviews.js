import "./RestroomReviews.css";
import RestroomRating from "../RestroomRating/RestroomRating";
import Rating from "react-rating";
import PinEmoji from "../Images/pin.png";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import WcIcon from "@mui/icons-material/Wc";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import RestroomReview from "./RestroomReview/RestroomReview.js";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faStar as farStar,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkFill } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ReportModal from "../ReportModal/ReportModal.js";
import Alert from "react-bootstrap/Alert";
import LocationProvider from "../../Helpers/LocationProvider";
import Cookies from "js-cookie";

function get_gender_string(genders) {
  let str = "";
  if (genders.indexOf("male") > -1) {
    str += "Male, ";
  }
  if (genders.indexOf("female") > -1) {
    str += "Female, ";
  }
  if (genders.indexOf("all gender") > -1) {
    str += "Gender Neutral, ";
  }
  if (str.length - 2 > 11) {
    return "All Options";
  }
  return str.substring(0, str.length - 2);
}
function changedDay(curDay) {
    const today = new Date();
    console.log("Today: " + today.getUTCDay());
    console.log("Day: " + curDay);
  return today.getUTCDay()+1 !== curDay;
}
function RestroomReviews({ userLocation, dist_bathroom }) {
  const filledStar = <FontAwesomeIcon icon={fasStar} />;
  const emptyStar = <FontAwesomeIcon icon={farStar} />;
  const bookMark = <FontAwesomeIcon icon={faBookmark} />;
  const yellowBookMark = (
    <FontAwesomeIcon style={{ color: "yellow" }} icon={faBookmarkFill} />
  );
  const [appearReview, setAppearReview] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [ratingValue, setRatingValue] = useState(null);
  const [warningShow, setWarningShow] = useState(false);
  const writeReviewClicked = () => {
    setAppearReview(!appearReview);
  };

  const [bathroom, setBathroom] = useState({
    building: "",
    floor: "",
    latitude: 0,
    longitude: 0,
    address: "",
    rating: null,
    number_ratings: 0,
    genders: ["Male"],
    photos: [],
    reported: -1,
  });
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [favorite, setFavorite] = useState(false);

  function containsBathroomId(bathroom_list) {
    let bathroom_id = parseInt(searchParams.get("_id"), 10);
    for (let i = 0; i < bathroom_list.length; i++) {
      if (bathroom_list[i].bathroom_id === bathroom_id) {
        console.log("Returning true");
        return true;
      }
    }
    return false;
  }

  function getFavorites() {
    let userId = Cookies.get("userId");
    axios
      .get("http://localhost:4000/get-favorite?userId=" + userId)
      .then((response) => {
        setFavorite(containsBathroomId(response.data));
        console.log("Show Favorites: ");
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getInformation() {
    let bathroom_id = parseInt(searchParams.get("_id"), 10);
    axios
      .get("http://localhost:4000/get-bathroom")
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].bathroom_id === bathroom_id) {
            setBathroom(response.data[i]);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://localhost:4000/get-review?bathroomId=" + bathroom_id)
      .then((response) => {
        console.log("Setting Responses");
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function submitReview(event) {
    event.preventDefault();
    let value = event.target.elements.reviewArea.value;

    if (ratingValue == null) {
      setWarningShow(true);
      return false;
    } else {
      let bathroom_id = parseInt(searchParams.get("_id"), 10);
      fetch("http://localhost:4000/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userId: Cookies.get("userId"),
          bathroomId: bathroom_id,
          rating: ratingValue,
          description: value,
        }),
        credentials: "include",
      })
        .catch((error) => {
          console.error(error);
          return;
        })
        .then((response) => {
          window.location.reload();
        });
    }
  }
  function changeFavorite() {
    setFavorite(!favorite);
    let bathroom_id = parseInt(searchParams.get("_id"), 10);
    let userId = Cookies.get("userId");

    fetch("http://localhost:4000/change-favorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ userId: userId, bathroomId: bathroom_id }),
      credentials: "include",
    }).catch((error) => {
      console.error(error);
      return;
    });
  }
   
    useEffect(() => {
	getInformation();
	getFavorites();
	// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
  return (
    <div className="restroom-reviews">
      <div className="images">
        {bathroom.photos.map((image_link) => {
          return <img src={image_link} alt="bathroom" />;
        })}
      </div>
      <div className="description">
        <div className="address" style={{ justifyContent: "center" }}>
          <h2 className="subtitle bathroom-name">
            {bathroom.building + " " + bathroom.floor}
          </h2>
          <p>
            <img src={PinEmoji} alt="pin" />{" "}
            <Badge bg="primary" style={{ justifyContent: "center" }}>
              {bathroom.address}
            </Badge>
          </p>
        </div>
        <Alert
          className="danger"
          variant="danger"
          show={!changedDay(bathroom.reported)}
        >
          This restroom has been reported today
        </Alert>
        <RestroomRating data={bathroom} />
      </div>
      <div className="description-border"></div>
      <div className="actions">
        <Button
          variant="secondary"
          active={appearReview}
          onClick={writeReviewClicked}
        >
          <StarBorderIcon /> WRITE A REVIEW
        </Button>
        <Button variant="secondary" onClick={changeFavorite}>
          {favorite ? (
            <p> {yellowBookMark} Favorited </p>
          ) : (
            <p> {bookMark} ADD TO FAVORITES </p>
          )}
        </Button>
        <Button variant="secondary" onClick={() => setModalShow(true)}>
          <CampaignOutlinedIcon /> REPORT
        </Button>
        <ReportModal
          show={modalShow}
          bathroom={bathroom.building + " " + bathroom.floor}
          data={bathroom}
          onHide={() => setModalShow(false)}
        />
      </div>
      <div className="general">
        <p>
          <div style={{ color: "grey", transform: "scale(1.3)" }}>
            {" "}
            <WcIcon />{" "}
          </div>
          <Badge bg="dark">{get_gender_string(bathroom.genders)}</Badge>
        </p>
        <p>
          <div style={{ color: "grey", transform: "scale(1.3)" }}>
            {" "}
            <DirectionsWalkIcon />{" "}
          </div>
          <Badge bg="dark"> {dist_bathroom(bathroom)} Feet </Badge>
        </p>
      </div>
      {appearReview && (
        <div className="write-review">
          <Rating
            emptySymbol={emptyStar}
            fullSymbol={filledStar}
            fractions={2}
            initialRating={ratingValue}
            onClick={(value) => setRatingValue(value)}
          />
          {warningShow ? (
            <p style={{ color: "red" }}>Please select a rating</p>
          ) : null}
          <div className="field-header">SELECT YOUR RATING</div>
          <Form className="text-box" onSubmit={submitReview}>
            <Form.Group className="mb-3 text-box" controlId="reviewArea">
              <Form.Control className="review-box" as="textarea" rows={3} />
            </Form.Group>
            <Button variant="secondary" type="submit">
              SUBMIT
            </Button>
          </Form>
        </div>
      )}
      <div className="reviews-wrap">
        <div className="reviews">
          {reviews
            .slice()
            .reverse()
            .map((review) => {
              return <RestroomReview data={review} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default LocationProvider(RestroomReviews);
