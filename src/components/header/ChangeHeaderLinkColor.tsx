export const AccordingChangeColorToLocation = (id: number, location:any) => {
  const ControlColor = () => {
    if (id === 1 && location.pathname === "") {
      return "#FF6600";
    } else if (id === 2 && location.pathname === "/whyride") {
      return "#FF6600";
    } else if (id === 3 && location.pathname === "/blog") {
      return "#FF6600";
    } else if (id === 4 && location.pathname === "/about") {
      return "#FF6600";
    } else if (id === 5 && location.pathname === "/bepartner") {
      return "#FF6600";
    } else if (id === 6 && location.pathname === "/contact") {
      return "#FF6600";
    } else {
      return "";
    }
  };
  return ControlColor();
};
