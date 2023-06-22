import style from "./header.module.css";

function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>star wars movies and characters</h1>
    </header>
  )
}
export default Header