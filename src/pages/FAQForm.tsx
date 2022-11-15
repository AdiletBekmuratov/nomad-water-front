function FAQForm() {
  return (
    <div className="block">
      <form action="">
        <label htmlFor="name" className="font-roboto font-normal block">
          Имя
        </label>
        <input type="text" name="name" />
        <label htmlFor="phone" className="font-roboto font-normal block"></label>
        <input type="text" />
        <textarea name="" id=""></textarea>
      </form>
    </div>
  );
}

export default FAQForm;
