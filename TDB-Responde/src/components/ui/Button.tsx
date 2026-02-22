interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'normal' | 'large';
}

function Button({ children, href, variant = 'primary', size = 'normal' }: ButtonProps) {
  //constante que trata da formatação base
  const baseClasses = "inline-block rounded-xl font-semibold transition-colors transition-transform duration-300 hover:scale-125";
  
  //constante que trata da cor
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 ",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  };
  
  //constante que trata do tamanho
  const sizeClasses = {
    normal: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };
  
  //constante que une tudo
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  //validando se tem link ou é botão
  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }
  
  return <button className={classes}>{children}</button>;
}

export default Button;