import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.module.css';

const Button = forwardRef(function Button(
  {
    children,
    size = 'md',
    variant = 'primary',
    disabled = false,
    onClick,
    type = 'button',
    className,
    ...rest
  },
  ref
) {
  const btnClass = classNames(
    styles.button,
    styles[variant],
    styles[`size-${size}`],
    {
      [styles.disabled]: disabled,
    },
    className
  );

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={btnClass}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  /** Button label or inner elements */
  children: PropTypes.node.isRequired,
  /** Size of the button: small, medium, large */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Visual variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Click handler */
  onClick: PropTypes.func,
  /** HTML button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Additional class names */
  className: PropTypes.string,
};

export default Button;