interface Props {
  children: React.ReactNode;
}

function Form({ children }: Props) {
    return (
      <>
        <div className="form-con">
          <form className="from-login-create">
            {children}
          </form>
        </div>
      </>
    );
}

export default Form;
