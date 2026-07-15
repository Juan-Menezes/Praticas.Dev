function status(request, response) {
  response.status(200).json({ Testando: "Response" });
}

export default status;
