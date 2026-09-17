import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

/* -------------------------------------------------------------------------
   Design‑system tokens (assume they are defined in a global :root elsewhere)
   -------------------------------------------------------------------------
   --color-surface      : #ffffff;
   --color-surface-variant : #f5f5f5;
   --color-primary      : #0066ff;
   --color-on-primary   : #ffffff;
   --radius-sm          : 4px;
   --radius-md          : 8px;
   --radius-lg          : 12px;
   --shadow-xs          : 0 1px 2px rgba(0,0,0,0.05);
   --shadow-sm          : 0 2px 4px rgba(0,0,0,0.07);
   --shadow-md          : 0 4px 8px rgba(0,0,0,0.10);
   --shadow-lg          : 0 8px 16px rgba(0,0,0,0.15);
   --transition-fast    : 150ms ease;
   --spacing-xs         : 0.5rem;
   --spacing-sm         : 1rem;
   --spacing-md         : 1.5rem;
   --spacing-lg         : 2rem;
-------------------------------------------------------------------------- */

const CardContainer = styled.article`
  background: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
  width: 100%;

  /* Responsive max‑width */
  max-width: 100%;
  @media (min-width: 480px) {
    max-width: 360px;
  }
  @media (min-width: 768px) {
    max-width: 420px;
  }

  &:hover,
  &:focus-visible {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.header`
  background: var(--color-primary);
  color: var(--color-on-primary);
  padding: var(--spacing-sm);
  font-weight: 600;
  font-size: 1.125rem;
`;

const CardBody = styled.section`
  flex: 1 1 auto;
  padding: var(--spacing-sm);
  background: var(--color-surface-variant);
  font-size: 1rem;
  line-height: 1.5;
`;

const CardFooter = styled.footer`
  padding: var(--spacing-sm);
  background: var(--color-surface);
  text-align: right;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const Card = ({
  header,
  footer,
  children,
  className,
  ...rest
}) => (
  <CardContainer className={className} {...rest}>
    {header && <CardHeader>{header}</CardHeader>}
    <CardBody>{children}</CardBody>
    {footer && <CardFooter>{footer}</CardFooter>}
  </CardContainer>
);

Card.propTypes = {
  /** Content rendered inside the header slot */
  header: PropTypes.node,
  /** Content rendered inside the footer slot */
  footer: PropTypes.node,
  /** Main body content */
  children: PropTypes.node.isRequired,
  /** Optional className for extending styles */
  className: PropTypes.string,
};

Card.defaultProps = {
  header: null,
  footer: null,
  className: '',
};

export default Card;