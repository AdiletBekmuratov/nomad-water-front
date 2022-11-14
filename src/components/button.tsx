type Props = {
  data: Object;
  isDisabled: boolean;
};

const Button = (props: Props) => {
  const onClick = () => {
    alert(JSON.stringify(props.data));
  };

  return (
    <div className={`justify-center flex mt-2`}>
      <button
        type="submit"
        onClick={onClick}
        className="text-white bg-prevent w-28 rounded-lg font-roboto"
        disabled={props.isDisabled}>
        Отправить
      </button>
    </div>
  );
};

export default Button;
