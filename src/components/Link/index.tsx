import { styled } from "@mui/system";
interface LinkButtonProps{
    children:string,
    href:string,
};
export const LinkButton = styled("a")({
    textAlign: "center",
    border: "none",
    display: "inline",
    width: "min-width",
    letterSpacing:"1px",
    backgroundColor: "transparent",
    cursor: "pointer",
    textDecoration: "none",
    color: "white",
    "&.MuiButtonBase-root:hover": {
        bgcolor: "transparent",
    },
});
export const index = ({ children, href }: LinkButtonProps) => {
    return <LinkButton href={href}>{children}</LinkButton>;
};
