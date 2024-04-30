export default function CustomTabPanel(props) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={
        className ? className + " tab-panel scroll-y" : " tab-panel scroll-y"
      }
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
