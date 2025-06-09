import "nes.css/css/nes.min.css";

const BackToHomeButton = () => {
  const handleBackHome = () => {
    console.log("ENTROU AQUI");
    window.location.href = "http://localhost:3000/amo-te-mi-carino";
  };
  return (
    <div className='flex justify-center' onClick={handleBackHome}>
      <img
        src='/icons/home.png'
        style={{
          width: "50px",
          height: "50px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
};

export default BackToHomeButton;
