const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  const message = notification.message;
  const success = notification.success;

  const notificationStyle = {
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  success
    ? (notificationStyle.color = "green")
    : (notificationStyle.color = "red");

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
