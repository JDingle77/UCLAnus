import NavBarComponent from "../Components/NavBarComponent/NavBarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileInfo from "../Components/ProfileInfo/ProfileInfo";
import FavoritesList from "../Components/FavoritesList/FavoritesList";
import ReviewsList from "../Components/ReviewsList/ReviewsList";

function Accountpage() {
  return (
    <span>
	    <NavBarComponent/>
      <ProfileInfo/>
      <FavoritesList/>
      <ReviewsList/>
    </span>
  );
}

export default Accountpage;
