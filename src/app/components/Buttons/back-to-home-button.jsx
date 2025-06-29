import "nes.css/css/nes.min.css";

const BackToHomeButton = () => {
  const handleBackHome = () => {
    window.location.href = "https://guess-what-psi.vercel.app/amo-te-mi-carino";
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
