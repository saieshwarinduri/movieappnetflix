import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer">
    <div className="iconscontainer">
      <button className="socialbutton" type="button">
        <FaGoogle />
      </button>
      <button className="socialbutton" type="button">
        <FaTwitter />
      </button>
      <button className="socialbutton" type="button">
        <FaInstagram />
      </button>
      <button className="socialbutton" type="button">
        <FaYoutube />
      </button>
    </div>
    <p>Contact us</p>
  </div>
)

export default Footer
