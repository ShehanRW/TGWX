import React from 'react';

const Section = ({
  children,
  title,
  subtitle,
  badge,
  background = 'white',
  spacing = 'lg',
  className = '',
  ...props
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
    gradient: 'bg-gradient-to-br from-gray-50 to-white',
  };
  
  const spacings = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-20',
    '2xl': 'py-24',
  };
  
  return (
    <section className={`${backgrounds[background]} ${spacings[spacing]} ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || badge) && (
          <div className="text-center mb-12">
            {badge && (
              <Badge variant="success" size="md" className="mb-4">
                {badge}
              </Badge>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;