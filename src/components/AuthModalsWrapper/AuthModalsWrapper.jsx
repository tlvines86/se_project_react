import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function AuthModalsWrapper({
  isRegisterOpen,
  isLoginOpen,
  closeRegister,
  closeLogin,
  openRegister,
  openLogin,
  onRegister,
  onLogin,
}) {
  return (
    <>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        switchToLogin={openLogin}
        onRegister={onRegister}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLogin}
        switchToRegister={openRegister}
        onLogin={onLogin}
      />
    </>
  );
}

export default AuthModalsWrapper;
