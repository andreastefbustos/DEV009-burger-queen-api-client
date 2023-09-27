import errorImg from "../assets/img/error.png"

export function Error(): JSX.Element {
  return (
    <div className="error">
      <div className="text-center content-center">
        <h1 className="title-error">Oops!</h1>
        <p className="p-error">Sorry, an unexpected error has occurred.</p>
      </div>
      <img src={errorImg} alt="error imagen" className="error_img_burger"/>
    </div>
  );
}



