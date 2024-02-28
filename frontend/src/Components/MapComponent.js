import Container from "react-bootstrap/Container";

let { mapsApiKey } = require("./mapsapikey.json");

function BasicExample() {
  let maps_src =
    "https://www.google.com/maps/embed/v1/place?key=" +
    mapsApiKey +
    "&q=Eiffel+Tower,Paris+France";
  return (
    <div id="map" style={{ width: "100%" }}>
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        style={{ border: 0 }}
        referrerpolicy="no-referrer-when-downgrade"
        src={maps_src}
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default BasicExample;
