import Link from "next/link";
import "./styles.css";



const NavegadorPags = () => {

    type LinkType = {
        name: string,
        link: string
    }

    const enlaces : LinkType[] = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Perfil",
            link: "/profile"
        },
        {
            name: "Desconectar",
            link: "/login"
        }
    ]

    return (
        <div className="NavigatorContainer">
            {enlaces.map((e)=>(<Link className="NavigatorLink" key={e.link} href={e.link}>{e.name}</Link>))}
        </div>
    )
}

export default NavegadorPags;