import mmmLogo from '../assets/mmmLogo.png'

const Navbar = () => {

    return (
        <div class="nav">
            <input type="checkbox" id="nav-check" />
            <div class="nav-header">
                <div class="nav-title">
                    <img src={mmmLogo} alt='mmmLogo' />
                </div>
            </div>
            <div class="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            {/* <div class="nav-links">
                <a href="#" target="_blank">Space List</a>
                <a href="#" target="_blank">FAQ</a>
                <a href="#" target="_blank">Resources</a>
            </div> */}
        </div>
    )
}

export default Navbar


