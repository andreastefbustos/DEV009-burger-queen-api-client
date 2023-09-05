interface LoginLayoutProps {
    children: React.ReactNode;
}

function LoginLayout({ children }: LoginLayoutProps): JSX.Element {
    return (
        <div className="login-background full-screen">
            {children}
        </div>
    );
}

export { LoginLayout };