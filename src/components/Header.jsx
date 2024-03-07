import style from './Header.module.css';
import logo from '../assets/turnerscars_logo_1line_horz_true-rgb-desktop.png';

export default function Header() {
    return (
        <div className={style.header}>
            <img src={logo} alt="" />
        </div>
    );
}
