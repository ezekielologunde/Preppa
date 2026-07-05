/* @ds-bundle: {"format":3,"namespace":"PreppaDesignSystem_759b79","components":[{"name":"MealCard","sourcePath":"components/content/MealCard.jsx"},{"name":"PrepperCard","sourcePath":"components/content/PrepperCard.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/content/MealCard.jsx":"00480e52ae99","components/content/PrepperCard.jsx":"b234a9ee80d2","components/core/Avatar.jsx":"0cc7bb1f2245","components/core/Badge.jsx":"a7c23a2f4f73","components/core/Button.jsx":"6e6fc8c57702","components/core/Card.jsx":"be8535c4a612","components/core/Input.jsx":"725e1677145b","components/core/Tag.jsx":"dca877098842","motion/animations.jsx":"ebe6809a6cbe","motion/video-scenes.jsx":"cae507d6ce17","redesign/data.js":"aa6860fd7d2e","ui_kits/consumer/AuthScreen.jsx":"e2c91d7abcf5","ui_kits/consumer/ChefStorefrontScreen.jsx":"0467bb6a71a7","ui_kits/consumer/ExploreScreen.jsx":"912f9b35750b","ui_kits/consumer/HomeScreen.jsx":"38a45ad2bfb7","ui_kits/consumer/Icons.jsx":"0bacd4b4a039","ui_kits/consumer/MealDetailScreen.jsx":"b4e53061cd86","ui_kits/consumer/MoreScreens.jsx":"17a0dbaf70b3","ui_kits/consumer/ProfileScreen.jsx":"0256306c277a","ui_kits/consumer/shared.jsx":"6072edb1abc0","ui_kits/consumer/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PreppaDesignSystem_759b79 = window.PreppaDesignSystem_759b79 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/MealCard.jsx
try { (() => {
/**
 * Preppa MealCard — the core listing tile used in home feed, explore, and search.
 * Supports 'normal' (carousel) and 'big' (hero) variants.
 */
function MealCard({
  meal,
  width = 200,
  variant = 'normal',
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  const big = variant === 'big';
  const imgHeight = big ? 188 : 130;
  const {
    title = 'Untitled',
    prepper = '',
    rating = 0,
    price = 0,
    time = '',
    image,
    badge
  } = meal || {};
  const cardStyle = {
    width: width === null ? '100%' : `${width}px`,
    borderRadius: big ? '24px' : '20px',
    overflow: 'hidden',
    background: 'var(--color-surface)',
    boxShadow: 'var(--shadow-card)',
    cursor: 'pointer',
    flexShrink: 0,
    transform: hovered ? 'translateY(-2px)' : 'none',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    fontFamily: 'var(--font-body)'
  };
  const imgWrap = {
    position: 'relative',
    height: `${imgHeight}px`,
    background: '#FCE9DD',
    overflow: 'hidden'
  };
  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transform: hovered ? 'scale(1.04)' : 'scale(1)',
    transition: 'transform 0.5s ease'
  };
  return React.createElement('div', {
    style: cardStyle,
    onClick: onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  },
  // Image
  React.createElement('div', {
    style: imgWrap
  }, image && React.createElement('img', {
    src: image,
    alt: title,
    style: imgStyle
  }),
  // Badge
  badge && React.createElement('div', {
    style: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: '#fff',
      borderRadius: '999px',
      padding: '3px 9px 3px 7px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  }, React.createElement('span', {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: badge.color,
      flexShrink: 0
    }
  }), React.createElement('span', {
    style: {
      fontWeight: 600,
      fontSize: '11px',
      color: 'var(--color-ink)'
    }
  }, badge.label)),
  // Big variant: title overlay
  big && React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: '12px',
      left: '14px',
      right: '14px'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '18px',
      color: '#fff',
      textShadow: '0 1px 8px rgba(0,0,0,0.5)'
    }
  }, title), React.createElement('div', {
    style: {
      fontWeight: 500,
      fontSize: '12.5px',
      color: 'rgba(255,255,255,0.92)',
      textShadow: '0 1px 6px rgba(0,0,0,0.5)'
    }
  }, `by ${prepper}`))),
  // Info row
  React.createElement('div', {
    style: {
      padding: '10px 12px 12px'
    }
  }, !big && React.createElement(React.Fragment, null, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '15px',
      color: 'var(--color-ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), React.createElement('div', {
    style: {
      fontSize: '12px',
      color: 'var(--color-text-muted)',
      marginTop: '2px'
    }
  }, `by ${prepper}`)), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginTop: big ? '0' : '6px'
    }
  }, React.createElement('svg', {
    width: '13',
    height: '13',
    viewBox: '0 0 24 24',
    fill: '#F59E0B',
    stroke: '#F59E0B',
    strokeWidth: '1.5'
  }, React.createElement('polygon', {
    points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
  })), React.createElement('span', {
    style: {
      fontWeight: 600,
      fontSize: '12px',
      color: 'var(--color-ink-soft)'
    }
  }, rating.toFixed(1)), React.createElement('span', {
    style: {
      fontSize: '12px',
      color: 'var(--color-text-muted)'
    }
  }, `· ${time} · $${price.toFixed(2)}`))));
}
Object.assign(__ds_scope, { MealCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/MealCard.jsx", error: String((e && e.message) || e) }); }

// components/content/PrepperCard.jsx
try { (() => {
/**
 * Preppa PrepperCard — kitchen/chef listing card shown in Explore and search.
 */
function PrepperCard({
  prepper,
  showRank = false,
  rank,
  onClick
}) {
  const [hovered, setHovered] = React.useState(false);
  const {
    name = 'Kitchen',
    verified = false,
    rating = 0,
    reviews = 0,
    location = '',
    options = '',
    from = 0,
    image,
    badge
  } = prepper || {};
  return React.createElement('div', {
    style: {
      width: '210px',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'var(--color-surface)',
      boxShadow: 'var(--shadow-card)',
      cursor: 'pointer',
      flexShrink: 0,
      transform: hovered ? 'translateY(-2px)' : 'none',
      transition: 'transform 0.18s ease',
      fontFamily: 'var(--font-body)'
    },
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  },
  // Cover image
  React.createElement('div', {
    style: {
      position: 'relative',
      height: '110px',
      background: 'var(--color-chip)',
      overflow: 'hidden'
    }
  }, image && React.createElement('img', {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), showRank && rank && React.createElement('div', {
    style: {
      position: 'absolute',
      top: '8px',
      left: '8px',
      background: 'var(--color-ink)',
      color: '#fff',
      borderRadius: '999px',
      padding: '3px 9px',
      fontSize: '11px',
      fontWeight: 700
    }
  }, `#${rank}`), badge && React.createElement('div', {
    style: {
      position: 'absolute',
      bottom: '8px',
      left: '8px',
      background: badge.color,
      borderRadius: '999px',
      padding: '3px 9px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, React.createElement('span', {
    style: {
      fontSize: '10px',
      fontWeight: 700,
      color: '#fff'
    }
  }, badge.label))),
  // Info
  React.createElement('div', {
    style: {
      padding: '12px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginBottom: '3px'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '15px',
      color: 'var(--color-ink)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      flex: 1
    }
  }, name), verified && React.createElement('svg', {
    width: '14',
    height: '14',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#F15F22',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }, React.createElement('path', {
    d: 'M20 6L9 17l-5-5'
  }))), React.createElement('div', {
    style: {
      fontSize: '11.5px',
      color: 'var(--color-text-muted)',
      marginBottom: '6px'
    }
  }, location), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, React.createElement('svg', {
    width: '12',
    height: '12',
    viewBox: '0 0 24 24',
    fill: '#F59E0B',
    stroke: '#F59E0B',
    strokeWidth: '1.5'
  }, React.createElement('polygon', {
    points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
  })), React.createElement('span', {
    style: {
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--color-ink-soft)'
    }
  }, rating.toFixed(1)), React.createElement('span', {
    style: {
      fontSize: '11.5px',
      color: 'var(--color-text-muted)'
    }
  }, ` · ${reviews} reviews`)), React.createElement('div', {
    style: {
      marginTop: '6px',
      fontSize: '11.5px',
      color: 'var(--color-text-muted)'
    }
  }, `from $${from} · ${options}`)));
}
Object.assign(__ds_scope, { PrepperCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PrepperCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
/**
 * Preppa Avatar — user/kitchen profile image with initial fallback.
 */
function Avatar({
  src,
  name,
  size = 40,
  shape = 'circle',
  verified = false
}) {
  const radius = shape === 'circle' ? '50%' : `${Math.round(size * 0.28)}px`;
  const fontSize = Math.round(size * 0.38);

  // Derive initials from name
  const initials = name ? name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('') : '?';

  // Deterministic hue from name
  const hue = name ? Array.from(name).reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360 : 30;
  const container = {
    position: 'relative',
    display: 'inline-flex',
    flexShrink: 0,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: radius,
    overflow: 'hidden',
    background: `oklch(0.82 0.08 ${hue})`,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  };
  return React.createElement('span', {
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexShrink: 0
    }
  }, React.createElement('span', {
    style: container
  }, src ? React.createElement('img', {
    src,
    alt: name || '',
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : React.createElement('span', {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: `${fontSize}px`,
      color: `oklch(0.35 0.06 ${hue})`,
      lineHeight: 1,
      userSelect: 'none'
    }
  }, initials)), verified && React.createElement('span', {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: `${Math.round(size * 0.36)}px`,
      height: `${Math.round(size * 0.36)}px`,
      borderRadius: '50%',
      background: 'var(--color-brand)',
      border: '2px solid var(--color-surface)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement('svg', {
    width: '8',
    height: '8',
    viewBox: '0 0 10 10',
    fill: 'none'
  }, React.createElement('polyline', {
    points: '2,5 4,7 8,3',
    stroke: '#fff',
    strokeWidth: '1.5',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }))));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * Preppa Badge — status pill used for "popular", "new", "trending", verified, etc.
 */
function Badge({
  children,
  variant = 'brand',
  size = 'md',
  dot = false
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    lineHeight: 1
  };
  const sizes = {
    sm: {
      fontSize: '10px',
      padding: '3px 8px',
      height: '20px'
    },
    md: {
      fontSize: '11px',
      padding: '4px 9px',
      height: '22px'
    },
    lg: {
      fontSize: '13px',
      padding: '5px 12px',
      height: '26px'
    }
  };
  const variants = {
    brand: {
      background: 'var(--color-brand)',
      color: '#fff'
    },
    'brand-tint': {
      background: 'var(--color-brand-tint)',
      color: 'var(--color-brand-pressed)'
    },
    success: {
      background: 'var(--color-success-bg)',
      color: 'var(--color-success)'
    },
    amber: {
      background: 'var(--color-amber-bg)',
      color: '#B45309'
    },
    danger: {
      background: 'var(--color-danger-bg)',
      color: 'var(--color-danger)'
    },
    neutral: {
      background: 'var(--color-chip)',
      color: 'var(--color-ink-soft)'
    },
    dark: {
      background: 'var(--color-ink)',
      color: '#fff'
    }
  };
  const dotColors = {
    brand: 'var(--color-brand)',
    'brand-tint': 'var(--color-brand)',
    success: 'var(--color-success)',
    amber: 'var(--color-amber)',
    danger: 'var(--color-danger)',
    neutral: 'var(--color-text-muted)',
    dark: 'rgba(255,255,255,0.5)'
  };
  return React.createElement('span', {
    style: {
      ...base,
      ...sizes[size],
      ...variants[variant]
    }
  }, dot && React.createElement('span', {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: dotColors[variant],
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * Preppa Button — primary CTA, secondary, ghost, and danger variants.
 * Matches the PressableScale + haptic style from the mobile app, adapted for web.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    borderRadius: 'var(--radius-pill)',
    border: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.55 : 1,
    transition: 'transform 0.1s ease, opacity 0.15s ease',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    width: fullWidth ? '100%' : undefined,
    boxSizing: 'border-box',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent'
  };
  const sizes = {
    sm: {
      height: '36px',
      padding: '0 14px',
      fontSize: '13px'
    },
    md: {
      height: '44px',
      padding: '0 20px',
      fontSize: '15px'
    },
    lg: {
      height: '54px',
      padding: '0 28px',
      fontSize: '16px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-brand)',
      color: '#fff'
    },
    secondary: {
      background: 'var(--color-chip)',
      color: 'var(--color-ink)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-ink-soft)',
      border: '1px solid var(--color-border)'
    },
    dark: {
      background: 'var(--color-ink)',
      color: '#fff'
    },
    danger: {
      background: 'var(--color-danger)',
      color: '#fff'
    }
  };
  const style = {
    ...base,
    ...sizes[size],
    ...variants[variant]
  };
  function handleMouseEnter(e) {
    if (!disabled && !loading) e.currentTarget.style.opacity = '0.88';
  }
  function handleMouseLeave(e) {
    if (!disabled && !loading) e.currentTarget.style.opacity = '1';
  }
  function handleMouseDown(e) {
    if (!disabled && !loading) e.currentTarget.style.transform = 'scale(0.97)';
  }
  function handleMouseUp(e) {
    if (!disabled && !loading) e.currentTarget.style.transform = 'scale(1)';
  }
  return React.createElement('button', {
    type,
    style,
    disabled: disabled || loading,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    ...rest
  }, loading ? React.createElement('span', {
    style: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite'
    }
  }) : children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/**
 * Preppa Card — the generic white surface card used throughout the app.
 */
function Card({
  children,
  padding = 16,
  radius = 'md',
  onClick,
  dark = false,
  style: extraStyle
}) {
  const [hovered, setHovered] = React.useState(false);
  const radii = {
    sm: '14px',
    md: '20px',
    lg: '24px'
  };
  const style = {
    background: dark ? 'var(--color-prepper-card)' : 'var(--color-surface)',
    borderRadius: radii[radius],
    padding: typeof padding === 'number' ? `${padding}px` : padding,
    boxShadow: 'var(--shadow-card)',
    cursor: onClick ? 'pointer' : 'default',
    transform: hovered && onClick ? 'translateY(-1px)' : 'none',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxSizing: 'border-box',
    ...(dark ? {
      border: '1px solid var(--color-prepper-border)'
    } : {}),
    ...extraStyle
  };
  return React.createElement('div', {
    style,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
/**
 * Preppa Input — text input with optional leading/trailing icon support.
 */
function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  leadingIcon,
  trailingIcon,
  disabled = false,
  error,
  label,
  id,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const wrapper = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  };
  const inputRow = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '54px',
    borderRadius: 'var(--radius-input)',
    background: 'var(--color-canvas)',
    border: `1.5px solid ${error ? 'var(--color-danger)' : focused ? 'var(--color-brand)' : 'transparent'}`,
    transition: 'border-color 0.15s ease',
    boxSizing: 'border-box',
    overflow: 'hidden'
  };
  const inputStyle = {
    flex: 1,
    height: '100%',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '15px',
    color: 'var(--color-ink)',
    paddingLeft: leadingIcon ? '12px' : '16px',
    paddingRight: trailingIcon ? '12px' : '16px',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.5 : 1
  };
  const iconSlot = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    color: 'var(--color-text-muted)',
    flexShrink: 0
  };
  return React.createElement('div', {
    style: wrapper
  }, label && React.createElement('label', {
    htmlFor: id,
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '13px',
      color: 'var(--color-ink-soft)'
    }
  }, label), React.createElement('div', {
    style: inputRow
  }, leadingIcon && React.createElement('span', {
    style: {
      ...iconSlot,
      paddingRight: 0
    }
  }, leadingIcon), React.createElement('input', {
    id,
    type,
    placeholder,
    value,
    onChange,
    disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: inputStyle,
    ...rest
  }), trailingIcon && React.createElement('span', {
    style: {
      ...iconSlot,
      paddingLeft: 0
    }
  }, trailingIcon)), error && React.createElement('span', {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      color: 'var(--color-danger)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/**
 * Preppa Tag — category filter chip used in search, cuisine filters, and kitchen tags.
 */
function Tag({
  children,
  active = false,
  onClick,
  icon
}) {
  const [hovered, setHovered] = React.useState(false);
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    height: '36px',
    padding: '0 14px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontWeight: active ? 600 : 500,
    fontSize: '13px',
    cursor: onClick ? 'pointer' : 'default',
    border: `1px solid ${active ? '#F8C9B0' : 'var(--color-border)'}`,
    background: active ? 'var(--color-brand-tint)' : hovered && onClick ? 'var(--color-chip)' : 'var(--color-surface)',
    color: active ? 'var(--color-brand)' : 'var(--color-ink-soft)',
    transition: 'background 0.12s ease, color 0.12s ease',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxShadow: 'var(--shadow-card)'
  };
  return React.createElement('span', {
    style,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false)
  }, icon && React.createElement('span', {
    style: {
      display: 'flex',
      alignItems: 'center',
      opacity: 0.7
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// motion/animations.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx
// Reusable animation starter: Stage, Timeline, Sprite, easing helpers.
// Exports (to window): Stage, Sprite, PlaybackBar, TextSprite, ImageSprite, RectSprite,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
// Usage (in an HTML file that loads React + Babel):
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <MyScene />
//   </Stage>
//
// <Stage> auto-scales to the viewport and provides the scrubber, play/pause,
// ←/→ seek, space, and 0-to-reset controls, and persists the playhead.
// Inside <Stage>, any child can call useTime() to read the current
// playhead (seconds). Or wrap content in <Sprite start={1} end={4}>...</Sprite>
// to only render during that window -- children receive a `localTime` and
// `progress` via the useSprite() hook. Use Easing + interpolate()/animate()
// for tweens; TextSprite / ImageSprite / RectSprite have built-in entry/exit.
// Build YOUR scenes by composing Sprites inside a Stage.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children
}) {
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(() => ({
    time: displayTime,
    duration,
    playing,
    setTime,
    setPlaying
  }), [displayTime, duration, playing]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: canvasRef,
    style: {
      width,
      height,
      background,
      position: 'relative',
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      flexShrink: 0,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: ctxValue
  }, children))), /*#__PURE__*/React.createElement(PlaybackBar, {
    time: displayTime,
    actualTime: time,
    duration: duration,
    playing: playing,
    onPlayPause: () => setPlaying(p => !p),
    onReset: () => {
      setTime(0);
    },
    onSeek: t => setTime(t),
    onHover: t => setHoverTime(t)
  }));
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 6,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  Stage,
  PlaybackBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "motion/animations.jsx", error: String((e && e.message) || e) }); }

// motion/video-scenes.jsx
try { (() => {
// ============================================================
// motion/video-scenes.jsx — Preppa Welcome Video scene components
// Loaded via <script type="text/babel"> after animations.jsx
// ============================================================

// ── Palette & utilities ──────────────────────────────────────
const ORANGE = '#F15F22',
  ORANGE_GLOW = '#FF814A',
  ORANGE_PRESS = '#D9430F';
const INK = '#111827',
  CANVAS = '#F7F7F8',
  SURFACE = '#FFFFFF';
const MUTED = '#9CA3AF',
  SEC = '#6B7280';
const PBG = '#0C0E13',
  PCARD = '#13161D',
  PBORD = '#252A34';
const GREEN = '#34d399',
  YELLOW = '#fbbf24',
  BLUE = '#60a5fa',
  PURPLE = '#a78bfa';
const FD = "'Bricolage Grotesque', system-ui, sans-serif";
const FB = "'Plus Jakarta Sans', system-ui, sans-serif";
const FL = "'Clash Display', 'Bricolage Grotesque', system-ui, sans-serif";
const itp = (t, inp, out) => window.interpolate(t, inp, out, {
  clamp: true
});
const uimg = (id, w = 480) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const CONFETTI = Array.from({
  length: 36
}, (_, i) => ({
  x: 360 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 1200,
  y: 150 + (Math.cos(i * 1.7) * 0.5 + 0.5) * 680,
  w: 9 + i % 5 * 5,
  h: 6 + i % 4 * 3,
  color: [ORANGE, YELLOW, GREEN, BLUE, PURPLE, '#f472b6'][i % 6],
  vy: 35 + i % 7 * 12,
  r: i * 37
}));

// ── PhoneFrame ───────────────────────────────────────────────
function PhoneFrame({
  children,
  dark = false,
  glowColor,
  scaleUp = 1
}) {
  const W = 274 * scaleUp,
    H = 558 * scaleUp;
  const R = 40 * scaleUp;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W,
      height: H,
      borderRadius: R,
      flexShrink: 0,
      position: 'relative',
      overflow: 'hidden',
      background: dark ? '#060810' : '#141414',
      boxShadow: [`0 0 0 ${2 * scaleUp}px ${dark ? '#1e222e' : '#2a2a2a'}`, `0 ${50 * scaleUp}px ${100 * scaleUp}px rgba(0,0,0,0.85)`, glowColor ? `0 0 ${80 * scaleUp}px 8px ${glowColor}` : ''].filter(Boolean).join(', ')
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 76 * scaleUp,
      height: 26 * scaleUp,
      background: dark ? '#060810' : '#141414',
      borderRadius: `0 0 ${16 * scaleUp}px ${16 * scaleUp}px`,
      zIndex: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: R - 2,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: dark ? PBG : CANVAS
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 7 * scaleUp,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 88 * scaleUp,
      height: 3.5 * scaleUp,
      borderRadius: 2 * scaleUp,
      background: dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.14)',
      zIndex: 20
    }
  }));
}
function SBar({
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 34,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 15px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontWeight: 700,
      fontSize: 11,
      color: dark ? 'rgba(255,255,255,0.85)' : INK
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "9",
    viewBox: "0 0 13 9",
    fill: dark ? '#fff' : INK
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "5.5",
    width: "2.2",
    height: "3.5",
    rx: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3.2",
    y: "3.5",
    width: "2.2",
    height: "5.5",
    rx: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "6.4",
    y: "1.5",
    width: "2.2",
    height: "7.5",
    rx: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "0",
    width: "2.2",
    height: "9",
    rx: "0.4"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "9",
    viewBox: "0 0 20 9",
    fill: "none",
    stroke: dark ? '#fff' : INK,
    strokeWidth: "1.4"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.7",
    y: "0.7",
    width: "13.6",
    height: "7.6",
    rx: "1.3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 3.2v2.6a1.3 1.3 0 000-2.6z",
    fill: dark ? '#fff' : INK,
    stroke: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2.2",
    y: "2.2",
    width: "8.5",
    height: "4.6",
    rx: "0.6",
    fill: dark ? '#fff' : INK
  }))));
}

// ── Boring competitor app ────────────────────────────────────
function BoringApp() {
  const rows = [{
    name: 'Burger Palace',
    time: '35–45 min',
    r: '3.8',
    bg: '#c9c9c9'
  }, {
    name: 'Noodle Box Co.',
    time: '30–45 min',
    r: '3.9',
    bg: '#bfbfbf'
  }, {
    name: 'Pizza Chain™',
    time: '40–55 min',
    r: '3.7',
    bg: '#c5c5c5'
  }, {
    name: 'Sushi Express',
    time: '25–35 min',
    r: '4.0',
    bg: '#bbbbbb'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#ececec',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SBar, {
    dark: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#e0e0e0',
      padding: '4px 11px 8px',
      borderBottom: '1px solid #ccc'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 800,
      fontSize: 15,
      color: '#555',
      letterSpacing: '-0.3px'
    }
  }, "FOODAPP\u2122"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 26,
      background: '#d2d2d2',
      borderRadius: 6,
      marginTop: 5,
      display: 'flex',
      alignItems: 'center',
      padding: '0 9px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontSize: 10,
      color: '#999'
    }
  }, "\uD83D\uDD0D  Search restaurants...")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 5,
      marginTop: 6
    }
  }, ['All', 'Fast Food', 'Asian', 'Pizza'].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      padding: '3px 9px',
      borderRadius: 999,
      background: i === 0 ? '#aaa' : '#d8d8d8',
      fontFamily: FB,
      fontSize: 9,
      color: i === 0 ? '#fff' : '#888',
      fontWeight: 600
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '7px 10px',
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: '#e3e3e3',
      borderRadius: 7,
      overflow: 'hidden',
      display: 'flex',
      height: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      background: r.bg,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 9px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 11,
      color: '#555'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: '#aaa',
      marginTop: 1
    }
  }, r.time, " \xB7 $2.99 delivery"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: '#aaa'
    }
  }, "\u2B50 ", r.r))))));
}

// ── Preppa home screen ───────────────────────────────────────
function PreppaHomeApp({
  localT = 99
}) {
  const cats = ['all', 'breakfast', 'lunch', 'nigerian 🇳🇬', 'vegan'];
  const meals = [{
    t: 'Honey Garlic Salmon',
    p: "kelsi's kitchen",
    $: '14.99',
    img: uimg('photo-1467003909585-2f8a72700288', 280)
  }, {
    t: 'Creamy Jerk Pasta',
    p: 'island bites',
    $: '13.49',
    img: uimg('photo-1473093295043-cdd812d0e601', 280)
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 13px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 500,
      fontSize: 11,
      color: SEC
    }
  }, "good evening \uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 18,
      color: INK,
      letterSpacing: '-0.5px',
      lineHeight: 1.15
    }
  }, "what are you", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "craving today?")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      height: 30,
      background: SURFACE,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      opacity: 0.35
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontSize: 10.5,
      color: MUTED
    }
  }, "search meals, cuisines..."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      padding: '8px 13px',
      flexShrink: 0
    }
  }, cats.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      flexShrink: 0,
      padding: '4px 9px',
      borderRadius: 999,
      background: i === 0 ? ORANGE : SURFACE,
      color: i === 0 ? '#fff' : INK,
      fontFamily: FB,
      fontWeight: i === 0 ? 600 : 500,
      fontSize: 9.5,
      opacity: localT > i * 0.3 + 0.2 ? 1 : 0,
      transition: 'opacity 0.25s ease'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 13px',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 13,
      color: INK,
      marginBottom: 7
    }
  }, "recommended"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, meals.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 115,
      borderRadius: 14,
      overflow: 'hidden',
      background: SURFACE,
      boxShadow: '0 3px 8px rgba(0,0,0,0.08)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.img,
    style: {
      width: '100%',
      height: 70,
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 8px 7px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 10.5,
      color: INK,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, m.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9,
      color: MUTED
    }
  }, "by ", m.p), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 10,
      color: ORANGE,
      marginTop: 2
    }
  }, "$", m.$)))))));
}

// ── Preppa app with pulsing rush hour banner ─────────────────
function PreppaRushApp({
  pulse = 0
}) {
  const glow = 18 + pulse * 28;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 13px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 16,
      color: INK
    }
  }, "what are you ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "craving?"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '9px 13px',
      background: ORANGE,
      borderRadius: 13,
      padding: '11px 13px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      boxShadow: `0 0 ${glow}px rgba(241,95,34,${0.35 + pulse * 0.5})`,
      transform: `scale(${1 + pulse * 0.015})`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 12,
      color: '#fff'
    }
  }, "\uD83C\uDF06 dinner rush active"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 10,
      color: 'rgba(255,255,255,0.85)'
    }
  }, "deals live until 7 pm \u2014 order now"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 13px 8px',
      background: '#11151C',
      borderRadius: 13,
      padding: '9px 11px',
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: uimg('photo-1467003909585-2f8a72700288', 160),
    style: {
      width: 42,
      height: 42,
      borderRadius: 10,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 11.5,
      color: '#fff'
    }
  }, "Honey Garlic Salmon"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: ORANGE
    }
  }, "\u2728 preppa ai pick for you"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: 'rgba(255,255,255,0.4)',
      marginTop: 1
    }
  }, "by kelsi's kitchen \xB7 $14.99"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '0 13px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 12,
      color: INK,
      marginBottom: 6
    }
  }, "nearby kitchens"), ["kelsi's kitchen", 'island bites', 'spice haus'].map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: SURFACE,
      borderRadius: 9,
      padding: '6px 8px',
      marginBottom: 5,
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      borderRadius: 9,
      background: ['#FDEDE4', '#DBEAFE', '#D1FAE5'][i],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 13,
      flexShrink: 0
    }
  }, "\uD83C\uDF73"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 10.5,
      color: INK
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9,
      color: MUTED
    }
  }, "4.9 \u2B50 \xB7 from $11")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontWeight: 700,
      fontSize: 9.5,
      color: ORANGE
    }
  }, "order")))));
}

// ── Order confirmed screen ───────────────────────────────────
function OrderConfirmedApp() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: '#F0FDF4',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(SBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 11,
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 68,
      height: 68,
      borderRadius: 34,
      background: '#16A34A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 22px rgba(22,163,74,0.55)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "32",
    height: "32",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 20,
      color: INK,
      textAlign: 'center',
      lineHeight: 1.15
    }
  }, "order", /*#__PURE__*/React.createElement("br", null), "confirmed! \uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 11,
      color: SEC,
      textAlign: 'center',
      lineHeight: 1.5,
      maxWidth: 180
    }
  }, "kelsi's kitchen is preparing your order. est. 30 mins"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderRadius: 12,
      padding: '10px 14px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 14.5,
      color: '#16A34A'
    }
  }, "240 points earned \uD83C\uDFC6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: MUTED,
      marginTop: 2
    }
  }, "Bronze tier \xB7 10 pts to Silver"))));
}

// ── Prepper dashboard ────────────────────────────────────────
function PrepperDash({
  ordersN = 12,
  earnings = 430,
  followerCount = 859
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: PBG,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SBar, {
    dark: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '9px 13px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 10,
      color: 'rgba(255,255,255,0.3)'
    }
  }, "good evening"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 16,
      color: '#fff',
      letterSpacing: '-0.3px'
    }
  }, "chef kelsey \uD83D\uDC4B")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      background: 'rgba(52,211,153,0.13)',
      borderRadius: 8,
      padding: '4px 8px',
      border: '1px solid rgba(52,211,153,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      background: GREEN
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 9.5,
      color: GREEN
    }
  }, "available"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      padding: '9px 13px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: PCARD,
      borderRadius: 11,
      padding: '9px 10px',
      border: `1px solid ${PBORD}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9,
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 3
    }
  }, "today's earnings"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 19,
      color: '#fff'
    }
  }, "$", earnings), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 9,
      color: GREEN,
      marginTop: 2
    }
  }, "\u2191 18% vs yesterday")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: PCARD,
      borderRadius: 11,
      padding: '9px 10px',
      border: `1px solid ${PBORD}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9,
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 3
    }
  }, "active orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 19,
      color: '#fff'
    }
  }, ordersN), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 9,
      color: YELLOW,
      marginTop: 2
    }
  }, "3 pending"))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '7px 13px 0',
      background: 'rgba(241,95,34,0.11)',
      borderRadius: 10,
      padding: '8px 10px',
      border: '1px solid rgba(241,95,34,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13
    }
  }, "\uD83D\uDD25"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 11,
      color: '#fff'
    }
  }, "\uD83C\uDF06 dinner rush active"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: 'rgba(255,255,255,0.4)'
    }
  }, "Prepare high-volume items now"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '7px 13px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, [{
    n: 'Marcus T.',
    i: 'Jerk Chicken × 2',
    s: 'preparing',
    c: ORANGE
  }, {
    n: 'Priya S.',
    i: 'Wellness Bowl × 1',
    s: 'pending',
    c: YELLOW
  }, {
    n: 'James O.',
    i: 'Salmon Bowl × 1',
    s: 'ready',
    c: GREEN
  }].map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: PCARD,
      borderRadius: 9,
      padding: '7px 9px',
      border: `1px solid ${PBORD}`,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: o.c,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 10.5,
      color: '#fff'
    }
  }, o.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9,
      color: 'rgba(255,255,255,0.3)'
    }
  }, o.i)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 9,
      color: o.c
    }
  }, o.s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 9.5,
      color: 'rgba(255,255,255,0.3)'
    }
  }, "followers"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 13,
      color: '#fff'
    }
  }, followerCount.toLocaleString())));
}

// ── Caption subtitle ─────────────────────────────────────────
function Caption({
  text,
  start,
  end
}) {
  const t = window.useTime();
  const op = itp(t, [start, start + 0.5, end - 0.5, end], [0, 1, 1, 0]);
  if (op < 0.01) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 52,
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '72%',
      textAlign: 'center',
      opacity: op,
      zIndex: 50,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      background: 'rgba(0,0,0,0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: 12,
      padding: '12px 24px',
      fontFamily: FB,
      fontSize: 23,
      color: '#fff',
      lineHeight: 1.55,
      letterSpacing: '-0.1px'
    }
  }, text));
}

// ────────────────────────────────────────────────────────────
// SCENE 1 — The Problem (0–18s)
// ────────────────────────────────────────────────────────────
function ProblemScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 0,
    E = 18;
  const sceneO = itp(t, [S, S + 0.6, E - 0.5, E], [0, 1, 1, 0]);
  const phoneSlide = itp(t, [S + 0.3, S + 1.4], [-340, 0]);
  const phoneO = itp(t, [S + 0.3, S + 1.2], [0, 1]);
  const text1O = itp(t, [S + 1.5, S + 2.5, S + 8.5, S + 9.5], [0, 1, 1, 0]);
  const text2O = itp(t, [S + 10, S + 11, E - 1, E], [0, 1, 1, 0]);
  const imgO = itp(t, [S + 5.5, S + 6.5, S + 9.5, S + 10.5], [0, 1, 1, 0]);
  const imgScale = itp(t, [S + 5.5, S + 9.5], [1.06, 1.0]);
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E + 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#13141f',
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '13%',
      top: '50%',
      transform: `translate(${phoneSlide}px, -50%)`,
      opacity: phoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    scaleUp: 1.18
  }, /*#__PURE__*/React.createElement(BoringApp, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '7%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '40%',
      opacity: text1O
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 500,
      fontSize: 22,
      color: 'rgba(255,255,255,0.3)',
      marginBottom: 10,
      letterSpacing: '-0.2px'
    }
  }, "you scroll and scroll and"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 80,
      color: '#fff',
      letterSpacing: '-2px',
      lineHeight: 0.95
    }
  }, "the same", /*#__PURE__*/React.createElement("br", null), "chains."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 80,
      color: 'rgba(255,255,255,0.18)',
      letterSpacing: '-2px',
      lineHeight: 0.95
    }
  }, "the same", /*#__PURE__*/React.createElement("br", null), "flavour.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '7%',
      top: '50%',
      transform: `translate(0, -50%) scale(${imgScale})`,
      opacity: imgO,
      width: '42%',
      aspectRatio: '4/3',
      borderRadius: 20,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: uimg('photo-1547592180-85f173990554', 700),
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'saturate(0.12) contrast(0.75) brightness(0.9)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 44,
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      textShadow: '0 2px 16px rgba(0,0,0,0.8)'
    }
  }, "same food.", /*#__PURE__*/React.createElement("br", null), "every. week."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: '64%',
      opacity: text2O,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 72,
      color: '#fff',
      letterSpacing: '-1.5px',
      lineHeight: 1.05
    }
  }, "and if you cook \u2014"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 72,
      color: ORANGE,
      letterSpacing: '-1.5px',
      lineHeight: 1.05
    }
  }, "you're still in", /*#__PURE__*/React.createElement("br", null), "a group chat.")), /*#__PURE__*/React.createElement(Caption, {
    text: "You're tired of the same chains, the same flavour. And if you cook \u2014 you're still running your business from a group chat.",
    start: S + 2,
    end: E - 0.8
  })));
}

// ────────────────────────────────────────────────────────────
// SCENE 2 — The Reveal (18–38s)
// ────────────────────────────────────────────────────────────
function RevealScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 18,
    E = 38;
  const sceneO = itp(t, [S, S + 0.3, E - 0.5, E], [0, 1, 1, 0]);
  const glowR = itp(t, [S + 0.4, S + 3], [0, 600]);
  const flameY = itp(t, [S, S + 1.8], [180, 0]);
  const flameSc = itp(t, [S, S + 1.8, S + 5, S + 7], [0.3, 1.08, 1.08, 0.94]);
  const flameO = itp(t, [S, S + 0.8, S + 6, S + 7.5], [0, 1, 1, 0]);
  const wordO = itp(t, [S + 4, S + 5.5, S + 8.5, S + 10], [0, 1, 1, 0]);
  const wordY = itp(t, [S + 4, S + 5.5], [28, 0]);
  const phoneO = itp(t, [S + 9, S + 11, E - 1, E], [0, 1, 1, 0]);
  const phoneSc = itp(t, [S + 9, S + 11], [0.84, 1]);
  const tagO = itp(t, [S + 12, S + 13.5, E - 1, E], [0, 1, 1, 0]);
  const tagY = itp(t, [S + 12, S + 13.5], [22, 0]);
  const localT = t - (S + 9);
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E + 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#000',
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '46%',
      transform: 'translate(-50%,-50%)',
      width: glowR * 2,
      height: glowR * 2,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(241,95,34,0.3) 0%, rgba(241,95,34,0.06) 45%, transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '46%',
      transform: `translate(-50%, calc(-50% + ${flameY}px)) scale(${flameSc})`,
      opacity: flameO,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      height: 130,
      borderRadius: 40,
      background: 'linear-gradient(155deg, #FF814A, #F15F22 55%, #D9430F)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 80px rgba(241,95,34,0.8), 0 0 160px rgba(241,95,34,0.4)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 24 24",
    fill: "#fff",
    stroke: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '46%',
      transform: `translate(-50%, calc(-50% + ${wordY}px))`,
      opacity: wordO,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FL,
      fontWeight: 800,
      fontSize: 130,
      color: '#fff',
      letterSpacing: '-3.5px',
      lineHeight: 1
    }
  }, "preppa"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 500,
      fontSize: 22,
      color: 'rgba(255,255,255,0.45)',
      letterSpacing: '0.22em',
      textTransform: 'uppercase'
    }
  }, "real food \xB7 real people")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%,-50%) scale(${phoneSc})`,
      opacity: phoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    glowColor: "rgba(241,95,34,0.25)",
    scaleUp: 1.18
  }, /*#__PURE__*/React.createElement(PreppaHomeApp, {
    localT: localT
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '14%',
      left: 0,
      right: 0,
      textAlign: 'center',
      opacity: tagO,
      transform: `translateY(${tagY}px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 52,
      color: '#fff',
      letterSpacing: '-1px',
      lineHeight: 1.15
    }
  }, "where real cooks become", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "the chefs people actually want."))), /*#__PURE__*/React.createElement(Caption, {
    text: "Preppa is the platform where real home cooks become the chefs people actually want. Real food. Real people. From your neighbourhood.",
    start: S + 12,
    end: E - 0.8
  })));
}

// ────────────────────────────────────────────────────────────
// SCENE 3 — Buyer Journey (38–62s)
// ────────────────────────────────────────────────────────────
function BuyerScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 38,
    E = 62;
  const sceneO = itp(t, [S, S + 0.5, E - 0.5, E], [0, 1, 1, 0]);
  const phoneO = itp(t, [S, S + 0.8], [0, 1]);
  const phoneSc = itp(t, [S, S + 0.8], [0.88, 1]);
  const localT = t - S;

  // Screen state
  const showRush = t >= S + 11 && t < S + 20;
  const showConfirmed = t >= S + 20;
  const pulse = showRush ? Math.sin((t - (S + 11)) * Math.PI * 3) * 0.5 + 0.5 : 0;

  // Text panels
  const t1O = itp(t, [S + 1, S + 2, S + 10, S + 11], [0, 1, 1, 0]);
  const t2O = itp(t, [S + 11, S + 12, S + 19.5, S + 20.5], [0, 1, 1, 0]);
  const t3O = itp(t, [S + 20, S + 21, E - 1, E], [0, 1, 1, 0]);

  // Confetti
  const confO = itp(t, [S + 20, S + 21, S + 28, S + 29], [0, 1, 1, 0]);
  const confDy = itp(t, [S + 20, S + 28], [0, 90]);
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E + 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#eeeef0',
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 20% 80%, rgba(241,95,34,0.07) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(241,95,34,0.04) 0%, transparent 50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '30%',
      top: '50%',
      transform: `translate(50%, -50%) scale(${phoneSc})`,
      opacity: phoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    scaleUp: 1.22
  }, showConfirmed ? /*#__PURE__*/React.createElement(OrderConfirmedApp, null) : showRush ? /*#__PURE__*/React.createElement(PreppaRushApp, {
    pulse: pulse
  }) : /*#__PURE__*/React.createElement(PreppaHomeApp, {
    localT: localT
  }))), confO > 0.01 && CONFETTI.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: d.x,
      top: d.y + confDy,
      width: d.w,
      height: d.h,
      borderRadius: 3,
      background: d.color,
      opacity: confO * 0.88,
      transform: `rotate(${d.r}deg)`,
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '6%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '32%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: t1O
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 500,
      fontSize: 20,
      color: 'rgba(0,0,0,0.35)',
      marginBottom: 10,
      letterSpacing: '-0.2px'
    }
  }, "browse by"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 80,
      color: INK,
      letterSpacing: '-2px',
      lineHeight: 0.95
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "craving,"), /*#__PURE__*/React.createElement("br", null), "cuisine,", /*#__PURE__*/React.createElement("br", null), "culture.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      opacity: t2O
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 68,
      color: INK,
      letterSpacing: '-1.5px',
      lineHeight: 1.05
    }
  }, "rush hour", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "deals."), /*#__PURE__*/React.createElement("br", null), "culture", /*#__PURE__*/React.createElement("br", null), "specials.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      opacity: t3O
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 80,
      color: INK,
      letterSpacing: '-2px',
      lineHeight: 0.95
    }
  }, "order", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#16A34A'
    }
  }, "confirmed.", /*#__PURE__*/React.createElement("br", null), "\uD83C\uDF89"))))), /*#__PURE__*/React.createElement(Caption, {
    text: "Browse by craving, cuisine, or culture. Rush-hour deals. Eid specials. Juneteenth soul food. Preppa shows you what's cooking right now, right near you.",
    start: S + 2,
    end: E - 0.8
  })));
}

// ────────────────────────────────────────────────────────────
// SCENE 4 — Prepper Journey (62–82s)
// ────────────────────────────────────────────────────────────
function PrepperScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 62,
    E = 82;
  const sceneO = itp(t, [S, S + 0.5, E - 0.5, E], [0, 1, 1, 0]);
  const phoneO = itp(t, [S + 0.4, S + 1.5], [0, 1]);
  const phoneSc = itp(t, [S + 0.4, S + 1.5], [0.86, 1]);
  const earnings = Math.round(itp(t, [S + 1, S + 5.5], [0, 430]));
  const ordersN = Math.round(itp(t, [S + 1.5, S + 4.5], [0, 12]));
  const t1O = itp(t, [S + 2, S + 3, S + 13, S + 14], [0, 1, 1, 0]);
  const chartO = itp(t, [S + 14, S + 15, E - 1, E], [0, 1, 1, 0]);
  const chartY = itp(t, [S + 14, S + 15], [20, 0]);
  const barGrow = itp(t, [S + 14, S + 20], [0, 1]);
  const bars = [{
    v: 65,
    d: 'M'
  }, {
    v: 78,
    d: 'T'
  }, {
    v: 90,
    d: 'W'
  }, {
    v: 55,
    d: 'T'
  }, {
    v: 88,
    d: 'F'
  }, {
    v: 95,
    d: 'S'
  }, {
    v: 100,
    d: 'S'
  }];
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E + 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: PBG,
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 25% 70%, rgba(241,95,34,0.08) 0%, transparent 50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '30%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${phoneSc})`,
      opacity: phoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    dark: true,
    glowColor: "rgba(241,95,34,0.12)",
    scaleUp: 1.18
  }, /*#__PURE__*/React.createElement(PrepperDash, {
    ordersN: ordersN,
    earnings: earnings
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '6%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '33%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: t1O
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 72,
      color: '#fff',
      letterSpacing: '-1.5px',
      lineHeight: 1.0
    }
  }, "your whole", /*#__PURE__*/React.createElement("br", null), "business.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "one place."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      opacity: chartO,
      transform: `translateY(${chartY}px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontWeight: 600,
      fontSize: 13,
      color: 'rgba(255,255,255,0.3)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 14
    }
  }, "weekly orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      alignItems: 'flex-end',
      height: 130,
      marginBottom: 14
    }
  }, bars.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: Math.round(b.v * 1.1 * barGrow) + 'px',
      background: i === 6 ? ORANGE : `rgba(241,95,34,${0.2 + b.v / 250})`,
      borderRadius: '5px 5px 0 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FB,
      fontSize: 11,
      color: 'rgba(255,255,255,0.3)'
    }
  }, b.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 56,
      color: '#fff',
      letterSpacing: '-1.2px',
      lineHeight: 1.05
    }
  }, "know exactly", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "when to push.")))), /*#__PURE__*/React.createElement(Caption, {
    text: "For cooks \u2014 Preppa is your whole business in one place. Your storefront. Your orders. Your earnings. Know when rush hour hits, which dish sells best.",
    start: S + 2,
    end: E - 0.8
  })));
}

// ────────────────────────────────────────────────────────────
// SCENE 5 — The Ecosystem (82–95s)
// ────────────────────────────────────────────────────────────
function EcosystemScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 82,
    E = 95;
  const sceneO = itp(t, [S, S + 0.5, E - 0.5, E], [0, 1, 1, 0]);
  const lPhoneO = itp(t, [S + 0.5, S + 1.5], [0, 1]);
  const rPhoneO = itp(t, [S + 1, S + 2], [0, 1]);
  const phoneSc = itp(t, [S + 0.5, S + 1.5], [0.88, 1]);
  const textO = itp(t, [S + 2, S + 3, E - 1.5, E - 0.5], [0, 1, 1, 0]);
  const textY = itp(t, [S + 2, S + 3], [18, 0]);
  const followers = 847 + Math.round(itp(t, [S + 4, S + 9], [0, 14]));
  const rewardO = itp(t, [S + 8.5, S + 9.5, E - 1, E], [0, 1, 1, 0]);
  const rewardSc = itp(t, [S + 8.5, S + 9.5], [0.7, 1]);
  const localT = t - S;
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E + 0.3
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      left: 0,
      width: '50%',
      background: '#E8E8EC'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      left: '50%',
      background: '#0A0C12'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      width: 3,
      transform: 'translateX(-50%)',
      background: `linear-gradient(to bottom, transparent, ${ORANGE} 30%, ${ORANGE} 70%, transparent)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '25%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${phoneSc})`,
      opacity: lPhoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    scaleUp: 1.1
  }, /*#__PURE__*/React.createElement(PreppaHomeApp, {
    localT: localT
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '75%',
      top: '50%',
      transform: `translate(-50%, -50%) scale(${phoneSc})`,
      opacity: rPhoneO
    }
  }, /*#__PURE__*/React.createElement(PhoneFrame, {
    dark: true,
    scaleUp: 1.1
  }, /*#__PURE__*/React.createElement(PrepperDash, {
    followerCount: followers,
    ordersN: 12,
    earnings: 430
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '10%',
      left: '50%',
      transform: `translate(-50%, ${textY}px)`,
      opacity: textO,
      width: 580,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 50,
      letterSpacing: '-1px',
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: INK
    }
  }, "follow the cooks you "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "love."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '12%',
      left: '50%',
      transform: `translate(-50%, 0) scale(${rewardSc})`,
      opacity: rewardO,
      background: YELLOW,
      borderRadius: 18,
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      boxShadow: '0 0 40px rgba(251,191,36,0.55)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 34
    }
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 22,
      color: '#0a0a0a'
    }
  }, "Gold tier unlocked!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 14,
      color: 'rgba(0,0,0,0.55)'
    }
  }, "1,200 points \xB7 $15 reward earned"))), /*#__PURE__*/React.createElement(Caption, {
    text: "Follow the cooks you love. Subscribe for the week. Earn rewards. Build something together. It's not just food delivery \u2014 it's a community that eats with intention.",
    start: S + 2,
    end: E - 0.8
  })));
}

// ────────────────────────────────────────────────────────────
// SCENE 6 — CTA (95–110s)
// ────────────────────────────────────────────────────────────
function CTAScene() {
  const Sprite = window.Sprite;
  const t = window.useTime();
  const S = 95,
    E = 110;
  const sceneO = itp(t, [S, S + 0.5], [0, 1]);
  const flameO = itp(t, [S, S + 1], [0, 1]);
  const flameSc = itp(t, [S, S + 1.2], [0.6, 1]);
  const breath = Math.sin((t - S) * Math.PI * 0.7) * 0.2 + 0.8;
  const wordO = itp(t, [S + 1, S + 1.8], [0, 1]);
  const tagStart = S + 3.5;
  const w1O = itp(t, [tagStart, tagStart + 0.5], [0, 1]);
  const w2O = itp(t, [tagStart + 1.1, tagStart + 1.6], [0, 1]);
  const w3O = itp(t, [tagStart + 2.2, tagStart + 2.7], [0, 1]);
  const urlO = itp(t, [S + 7.5, S + 9], [0, 1]);
  const urlY = itp(t, [S + 7.5, S + 9], [14, 0]);
  const badgesO = itp(t, [S + 10, S + 11.5], [0, 1]);
  const badgesY = itp(t, [S + 10, S + 11.5], [14, 0]);
  return /*#__PURE__*/React.createElement(Sprite, {
    start: S - 0.3,
    end: E
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#fff',
      opacity: sceneO
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 38%, rgba(241,95,34,0.09) 0%, transparent 58%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '36%',
      transform: `translate(-50%, -50%) scale(${flameSc})`,
      opacity: flameO,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 112,
      height: 112,
      borderRadius: 34,
      background: 'linear-gradient(155deg, #FF814A, #F15F22 55%, #D9430F)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 0 ${44 * breath}px rgba(241,95,34,${0.55 * breath}), 0 0 ${88 * breath}px rgba(241,95,34,${0.25 * breath})`
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "58",
    height: "58",
    viewBox: "0 0 24 24",
    fill: "#fff",
    stroke: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: wordO,
      fontFamily: FL,
      fontWeight: 800,
      fontSize: 90,
      color: INK,
      letterSpacing: '-2.5px',
      lineHeight: 1
    }
  }, "preppa")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '59%',
      left: 0,
      right: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 800,
      fontSize: 70,
      color: INK,
      letterSpacing: '-1.5px',
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      opacity: w1O,
      transition: 'opacity 0.4s ease',
      marginRight: '0.28em'
    }
  }, "Real food."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      opacity: w2O,
      transition: 'opacity 0.4s ease',
      marginRight: '0.28em'
    }
  }, "Real cooks."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      opacity: w3O,
      transition: 'opacity 0.4s ease',
      color: ORANGE
    }
  }, "Real close."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '74%',
      left: 0,
      right: 0,
      textAlign: 'center',
      opacity: urlO,
      transform: `translateY(${urlY}px)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FL,
      fontWeight: 700,
      fontSize: 40,
      color: SEC,
      letterSpacing: '-0.5px'
    }
  }, "preppa.live")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '82%',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: 22,
      opacity: badgesO,
      transform: `translateY(${badgesY}px)`
    }
  }, ['App Store', 'Google Play'].map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    style: {
      background: INK,
      borderRadius: 14,
      padding: '12px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, s === 'App Store' ? '🍎' : '▶'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FB,
      fontSize: 11,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Download on the"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FD,
      fontWeight: 700,
      fontSize: 17,
      color: '#fff'
    }
  }, s))))), /*#__PURE__*/React.createElement(Caption, {
    text: "Whether you're hungry or you cook \u2014 Preppa is where you belong. Download the app. Join the table.",
    start: S + 1,
    end: E - 0.8
  })));
}

// ── Exports ──────────────────────────────────────────────────
Object.assign(window, {
  ProblemScene,
  RevealScene,
  BuyerScene,
  PrepperScene,
  EcosystemScene,
  CTAScene
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "motion/video-scenes.jsx", error: String((e && e.message) || e) }); }

// redesign/data.js
try { (() => {
// Shared data for Preppa redesign concepts
const RD_IMG = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const RD_MEALS = [{
  id: 'm1',
  title: 'Honey Garlic Salmon',
  kitchen: "kelsi's kitchen",
  price: 14.99,
  rating: 4.8,
  time: '30 min',
  cat: 'dinner',
  img: 'photo-1467003909585-2f8a72700288',
  tag: 'popular'
}, {
  id: 'm2',
  title: 'Creamy Jerk Pasta',
  kitchen: 'island bites',
  price: 13.49,
  rating: 4.9,
  time: '25 min',
  cat: 'dinner',
  img: 'photo-1473093295043-cdd812d0e601',
  tag: 'new'
}, {
  id: 'm3',
  title: 'Wellness Bowl',
  kitchen: 'green plates',
  price: 12.49,
  rating: 4.7,
  time: '20 min',
  cat: 'healthy',
  img: 'photo-1512621776951-a57141f2eefd',
  tag: 'healthy'
}, {
  id: 'm4',
  title: 'Jerk Chicken Bowl',
  kitchen: 'spice haus',
  price: 13.99,
  rating: 4.9,
  time: '25 min',
  cat: 'dinner',
  img: 'photo-1546069901-ba9599a7e63c',
  tag: 'trending'
}, {
  id: 'm5',
  title: 'Butter Chicken Rice',
  kitchen: 'masala house',
  price: 11.99,
  rating: 4.6,
  time: '30 min',
  cat: 'dinner',
  img: 'photo-1585937421612-70a008356fbe',
  tag: null
}, {
  id: 'm6',
  title: 'Avocado Toast Stack',
  kitchen: 'green plates',
  price: 9.99,
  rating: 4.5,
  time: '15 min',
  cat: 'breakfast',
  img: 'photo-1541519227354-08fa5d50c820',
  tag: null
}, {
  id: 'm7',
  title: 'Smash Burger Deluxe',
  kitchen: 'patty culture',
  price: 12.99,
  rating: 4.8,
  time: '20 min',
  cat: 'lunch',
  img: 'photo-1568901346375-23c9450c58cd',
  tag: 'popular'
}, {
  id: 'm8',
  title: 'Rainbow Poke Bowl',
  kitchen: 'tide & rice',
  price: 15.49,
  rating: 4.7,
  time: '15 min',
  cat: 'healthy',
  img: 'photo-1563612116625-3012372fccce',
  tag: 'new'
}, {
  id: 'm9',
  title: 'Birria Tacos × 3',
  kitchen: 'la abuela',
  price: 13.49,
  rating: 4.9,
  time: '25 min',
  cat: 'lunch',
  img: 'photo-1551504734-5ee1c4a1479b',
  tag: 'trending'
}, {
  id: 'm10',
  title: 'Matcha Pancakes',
  kitchen: 'morning ritual',
  price: 10.99,
  rating: 4.6,
  time: '20 min',
  cat: 'breakfast',
  img: 'photo-1567620905732-2d1ec7ab7445',
  tag: null
}, {
  id: 'm11',
  title: 'Truffle Mushroom Risotto',
  kitchen: 'casa nonna',
  price: 16.99,
  rating: 4.8,
  time: '35 min',
  cat: 'dinner',
  img: 'photo-1476124369491-e7addf5db371',
  tag: 'premium'
}, {
  id: 'm12',
  title: 'Mango Sticky Rice',
  kitchen: 'bangkok st.',
  price: 8.99,
  rating: 4.7,
  time: '10 min',
  cat: 'dessert',
  img: 'photo-1551024506-0bccd828d307',
  tag: null
}];
const RD_KITCHENS = [{
  id: 'k1',
  name: "kelsi's kitchen",
  area: 'Harlem',
  rating: 4.9,
  orders: 1280,
  img: 'photo-1583394293214-28a5b0f5a5b8',
  spec: 'soul food · seafood'
}, {
  id: 'k2',
  name: 'island bites',
  area: 'Queens',
  rating: 4.8,
  orders: 960,
  img: 'photo-1577219491135-ce391730fb2c',
  spec: 'caribbean'
}, {
  id: 'k3',
  name: 'spice haus',
  area: 'Brooklyn',
  rating: 4.9,
  orders: 740,
  img: 'photo-1607631568010-a87245c0daf8',
  spec: 'fusion · jerk'
}, {
  id: 'k4',
  name: 'la abuela',
  area: 'Bronx',
  rating: 4.9,
  orders: 1105,
  img: 'photo-1556910103-1c02745aae4d',
  spec: 'mexican · birria'
}];
const RD_CATS = ['all', 'breakfast', 'lunch', 'dinner', 'healthy', 'dessert'];
Object.assign(window, {
  RD_MEALS,
  RD_KITCHENS,
  RD_CATS,
  RD_IMG
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "redesign/data.js", error: String((e && e.message) || e) }); }

// ui_kits/consumer/AuthScreen.jsx
try { (() => {
// AuthScreen — sign in / sign up
function AuthScreen({
  onSuccess
}) {
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    FONT_DISPLAY,
    FONT_BODY
  } = window.PREPPA_THEME;
  const {
    Icon
  } = window;
  const [mode, setMode] = React.useState('signup');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [msg, setMsg] = React.useState(null);
  function handleSubmit() {
    if (mode === 'signup' && name.trim().length < 2) return setMsg({
      text: 'Tell us your name.',
      ok: false
    });
    if (!email.includes('@')) return setMsg({
      text: 'Enter a valid email.',
      ok: false
    });
    if (password.length < 6) return setMsg({
      text: 'Password must be at least 6 characters.',
      ok: false
    });
    setMsg({
      text: mode === 'signup' ? 'Account created!' : 'Signed in!',
      ok: true
    });
    setTimeout(() => onSuccess && onSuccess(), 800);
  }
  const inputStyle = {
    width: '100%',
    height: 52,
    borderRadius: 15,
    background: CANVAS,
    border: 'none',
    outline: 'none',
    padding: '0 16px',
    fontFamily: FONT_BODY,
    fontSize: 15,
    color: INK,
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: SURFACE,
      padding: '0 24px',
      overflowY: 'auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -80,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 300,
      height: 300,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(241,95,34,0.14), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingTop: 14,
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onSuccess && onSuccess(),
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 13,
      color: MUTED,
      cursor: 'pointer'
    }
  }, "continue as guest \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 28,
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 68,
      height: 68,
      borderRadius: 20,
      background: 'linear-gradient(155deg,#FF814A,#F15F22 55%,#D9430F)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 28px rgba(241,95,34,0.5)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 34,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 28,
      color: INK,
      letterSpacing: '-0.6px'
    }
  }, mode === 'signup' ? 'join preppa' : 'welcome back'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      color: SECONDARY,
      marginTop: 6,
      maxWidth: 280
    }
  }, mode === 'signup' ? 'Real food from real local Preppas.' : 'Sign in to your account.'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, mode === 'signup' && /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    placeholder: "full name",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    placeholder: "you@email.com",
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("input", {
    style: inputStyle,
    placeholder: "password",
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value)
  }), mode === 'signin' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 13,
      color: SECONDARY,
      cursor: 'pointer'
    }
  }, "Forgot password?")), msg && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 13,
      color: msg.ok ? '#16A34A' : '#EF4444',
      padding: '0 2px'
    }
  }, msg.text), /*#__PURE__*/React.createElement("button", {
    onClick: handleSubmit,
    style: {
      height: 52,
      borderRadius: 999,
      background: ORANGE,
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 15,
      color: '#fff',
      marginTop: 4
    }
  }, mode === 'signup' ? 'Create account' : 'Sign in'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      color: SECONDARY,
      cursor: 'pointer'
    },
    onClick: () => {
      setMode(m => m === 'signin' ? 'signup' : 'signin');
      setMsg(null);
    }
  }, mode === 'signin' ? 'New here? ' : 'Already a member? ', /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      color: ORANGE
    }
  }, mode === 'signin' ? 'Create account' : 'Sign in')))));
}
Object.assign(window, {
  AuthScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/AuthScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/ChefStorefrontScreen.jsx
try { (() => {
// ChefStorefrontScreen — drill-down into a prepper's kitchen (cover, follow, menu grid)
function ChefStorefrontScreen({
  prepper,
  onBack,
  onMealPress
}) {
  const {
    MEALS
  } = window.PREPPA_DATA;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    BORDER,
    SUCCESS,
    YELLOW,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon,
    VerifiedBadge
  } = window;
  const TW = window.PREPPA_TWEAKS || {};
  const RAD = TW.radius != null ? TW.radius : 20;
  const showBadges = TW.showBadges !== false;
  const [follow, setFollow] = React.useState(false);
  const [seg, setSeg] = React.useState('menu');
  const p = prepper || {};
  const cover = p.image;
  const menu = MEALS;
  const STATS = [{
    v: (p.rating || 4.9).toFixed(1),
    l: 'rating',
    icon: 'star'
  }, {
    v: p.reviews || 128,
    l: 'reviews',
    icon: 'chat'
  }, {
    v: '1.2k',
    l: 'followers',
    icon: 'users'
  }];
  function MenuCard({
    meal
  }) {
    const [hov, setHov] = React.useState(false);
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => onMealPress(meal),
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        borderRadius: RAD,
        overflow: 'hidden',
        background: SURFACE,
        boxShadow: hov ? '0 12px 24px rgba(0,0,0,0.10)' : '0 4px 14px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform .18s, box-shadow .18s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 116,
        background: '#FCE9DD',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: meal.image,
      alt: meal.title,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: hov ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform .5s'
      }
    }), showBadges && meal.badge && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 8,
        left: 8,
        background: '#fff',
        borderRadius: 999,
        padding: '3px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: meal.badge.icon,
      size: 11,
      color: ORANGE
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 10,
        color: ORANGE
      }
    }, meal.badge.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 11px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 14,
        color: INK,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, meal.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: 12,
      color: YELLOW
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 11.5,
        color: '#374151'
      }
    }, meal.rating.toFixed(1))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 800,
        fontSize: 14,
        color: ORANGE
      }
    }, "$", meal.price.toFixed(2)))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 168
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: p.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 38%, rgba(0,0,0,0.12) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onBack,
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: 'rgba(255,255,255,0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: 'scaleX(-1)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 18,
    color: INK,
    stroke: 2.4
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: 'rgba(255,255,255,0.92)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: 16,
    color: INK
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderTopLeftRadius: 26,
      borderTopRightRadius: 26,
      marginTop: -22,
      padding: '0 20px 18px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 14,
      marginTop: -36,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 86,
      height: 86,
      borderRadius: 26,
      padding: 3,
      background: SURFACE,
      flexShrink: 0,
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cover,
    alt: p.name,
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 23,
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFollow(f => !f),
    style: {
      float: 'right',
      height: 38,
      padding: '0 20px',
      borderRadius: 999,
      border: follow ? `1.5px solid ${BORDER}` : 'none',
      background: follow ? SURFACE : ORANGE,
      color: follow ? SECONDARY : '#fff',
      cursor: 'pointer',
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 13.5,
      boxShadow: follow ? 'none' : '0 6px 16px rgba(241,95,34,0.32)'
    }
  }, follow ? 'following' : '+ follow'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 23,
      color: INK,
      letterSpacing: '-0.6px'
    }
  }, p.name), p.verified !== false && /*#__PURE__*/React.createElement(VerifiedBadge, {
    color: ORANGE,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 5,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: FONT_BODY,
      fontSize: 12.5,
      color: SECONDARY
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 13,
    color: MUTED
  }), " ", p.location || 'New York, NY'), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: 2,
      background: '#D1D5DB'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12.5,
      color: SECONDARY
    }
  }, p.options || 'delivers · pickup')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      margin: '15px 0 6px'
    }
  }, STATS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      flex: 1,
      background: CANVAS,
      borderRadius: 15,
      padding: '11px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 13,
    color: ORANGE
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 16,
      color: INK
    }
  }, s.v)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 10.5,
      color: MUTED,
      marginTop: 3
    }
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13.5,
      color: SECONDARY,
      lineHeight: 1.55,
      marginTop: 10
    }
  }, "Home kitchen serving fresh, small-batch plates made to order. Limited menu each night \u2014 follow to catch the next drop before it sells out."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      height: 44,
      borderRadius: 14,
      background: CANVAS,
      border: `1px solid ${BORDER}`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 13.5,
      color: INK
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chat",
    size: 16,
    color: INK
  }), " message"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      padding: '0 14px',
      borderRadius: 14,
      background: '#E7F6EC',
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 4,
      background: SUCCESS
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12.5,
      color: '#14532d'
    }
  }, "open \xB7 til 9pm")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '16px 20px 4px'
    }
  }, ['menu', 'reviews', 'about'].map(k => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setSeg(k),
    style: {
      height: 36,
      padding: '0 18px',
      borderRadius: 999,
      border: 'none',
      cursor: 'pointer',
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 13.5,
      background: seg === k ? INK : SURFACE,
      color: seg === k ? '#fff' : SECONDARY,
      boxShadow: seg === k ? 'none' : '0 2px 8px rgba(0,0,0,0.05)'
    }
  }, k))), seg === 'menu' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 17,
      color: INK,
      letterSpacing: '-0.4px'
    }
  }, "tonight's menu"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 12.5,
      color: MUTED
    }
  }, menu.length, " plates")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 13
    }
  }, menu.map(m => /*#__PURE__*/React.createElement(MenuCard, {
    key: m.id,
    meal: m
  })))), seg === 'reviews' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0'
    }
  }, [{
    n: 'Marcus T.',
    r: 5,
    t: 'Best meal I\'ve had on Preppa. Generous portions, packed warm.',
    d: '3 days ago'
  }, {
    n: 'Priya S.',
    r: 5,
    t: 'Consistently amazing — I follow just to catch the drops.',
    d: '1 week ago'
  }, {
    n: 'James O.',
    r: 4,
    t: 'Sauce is unreal. Delivery was quick too.',
    d: '2 weeks ago'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: SURFACE,
      borderRadius: 16,
      padding: '13px 14px',
      marginBottom: 10,
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: BRAND_TINT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12,
      color: ORANGE
    }
  }, r.n[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: INK
    }
  }, r.n)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, Array.from({
    length: r.r
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star",
    size: 11,
    color: YELLOW
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: MUTED,
      marginLeft: 5
    }
  }, r.d))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      lineHeight: 1.5
    }
  }, r.t)))), seg === 'about' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderRadius: 18,
      padding: '16px 16px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }
  }, [{
    icon: 'clock',
    l: 'hours',
    v: 'Tue–Sun · 4pm–9pm'
  }, {
    icon: 'pin',
    l: 'serves',
    v: p.location || 'New York, NY'
  }, {
    icon: 'leaf',
    l: 'specialties',
    v: 'fresh · small-batch · halal'
  }, {
    icon: 'trophy',
    l: 'on preppa since',
    v: '2023 · 1.2k orders'
  }].map((row, i, arr) => /*#__PURE__*/React.createElement("div", {
    key: row.l,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 0',
      borderBottom: i < arr.length - 1 ? `1px solid ${CANVAS}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 11,
      background: BRAND_TINT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: row.icon,
    size: 17,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: MUTED
    }
  }, row.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 14,
      color: INK,
      marginTop: 1
    }
  }, row.v)))))));
}
Object.assign(window, {
  ChefStorefrontScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/ChefStorefrontScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/ExploreScreen.jsx
try { (() => {
// ExploreScreen — discover cuisines & local preppers
function ExploreScreen({
  onMealPress,
  onPrepperPress
}) {
  const {
    POPULAR,
    PREPPERS,
    CUISINES,
    CATEGORIES_EXPLORE
  } = window.PREPPA_DATA;
  const {
    SectionHead
  } = window;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    PEACH,
    PEACH_2,
    BORDER,
    SUCCESS,
    PURPLE,
    YELLOW,
    PINK,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon
  } = window;
  const [cat, setCat] = React.useState('all');
  const CAT_COLOR = {
    all: ORANGE,
    breakfast: YELLOW,
    lunch: SUCCESS,
    dinner: ORANGE,
    snacks: '#EA580C',
    desserts: PINK,
    more: '#9CA3AF'
  };
  const TONE = {
    orange: {
      fg: ORANGE,
      soft: '#FDEDE4'
    },
    green: {
      fg: SUCCESS,
      soft: '#E7F6EC'
    },
    purple: {
      fg: PURPLE,
      soft: '#EDE9FE'
    }
  };
  function Heart({
    size = 30
  }) {
    const [on, setOn] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setOn(!on);
      },
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        background: 'rgba(255,255,255,0.92)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: on ? ORANGE : 'none',
      stroke: on ? ORANGE : '#9CA3AF',
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"
    })));
  }
  function PrepperCard({
    p
  }) {
    const [hov, setHov] = React.useState(false);
    const tone = TONE[p.badge.tone];
    const fromTone = TONE[p.fromTone];
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => onPrepperPress && onPrepperPress(p),
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        width: 218,
        borderRadius: 22,
        overflow: 'hidden',
        background: SURFACE,
        boxShadow: hov ? '0 12px 24px rgba(0,0,0,0.10)' : '0 4px 14px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        flexShrink: 0,
        transform: hov ? 'translateY(-3px)' : 'none',
        transition: 'transform .18s, box-shadow .18s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 138,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: p.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 9,
        left: 9,
        background: '#fff',
        borderRadius: 999,
        padding: '4px 9px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: p.badge.icon,
      size: 12,
      color: tone.fg
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 10.5,
        color: tone.fg
      }
    }, p.badge.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 8,
        right: 8
      }
    }, /*#__PURE__*/React.createElement(Heart, {
      size: 28
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 8,
        left: 9,
        display: 'flex'
      }
    }, p.thumbs.map((t, i) => /*#__PURE__*/React.createElement("img", {
      key: i,
      src: t,
      alt: "",
      style: {
        width: 30,
        height: 30,
        borderRadius: 15,
        objectFit: 'cover',
        border: '2px solid #fff',
        marginLeft: i ? -10 : 0
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '11px 12px 13px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 15,
        color: INK
      }
    }, p.name), p.verified && /*#__PURE__*/React.createElement(BadgeCheck, {
      color: ORANGE
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: YELLOW,
        fontSize: 12
      }
    }, "\u2605"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 12,
        color: '#374151'
      }
    }, p.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 12,
        color: MUTED
      }
    }, "(", p.reviews, ")")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 12,
        color: SECONDARY,
        marginTop: 5
      }
    }, p.location), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11.5,
        color: MUTED,
        marginTop: 2
      }
    }, "\u2022 ", p.options), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        marginTop: 9,
        background: fromTone.soft,
        borderRadius: 999,
        padding: '5px 11px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 12,
        color: fromTone.fg
      }
    }, "from $", p.from))));
  }
  function PopularCard({
    m
  }) {
    const tone = TONE[m.badge.tone];
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => onMealPress(m),
      style: {
        width: 172,
        borderRadius: 20,
        overflow: 'hidden',
        background: SURFACE,
        boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: 122,
        background: '#FCE9DD',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: m.image,
      alt: m.title,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 9,
        left: 9,
        background: '#fff',
        borderRadius: 999,
        padding: '4px 9px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.badge.icon,
      size: 12,
      color: tone.fg
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 10.5,
        color: tone.fg
      }
    }, m.badge.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 8,
        right: 8
      }
    }, /*#__PURE__*/React.createElement(Heart, {
      size: 28
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 11px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 13.5,
        color: INK,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, m.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11.5,
        color: MUTED,
        marginTop: 2
      }
    }, "by ", m.prepper), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: YELLOW,
        fontSize: 12
      }
    }, "\u2605"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 11.5,
        color: '#374151'
      }
    }, m.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11.5,
        color: MUTED
      }
    }, "(", m.reviews, ")")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11.5,
        color: SECONDARY,
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: INK
      }
    }, "$", m.price.toFixed(2)), " \xB7 ", m.time)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 34,
      color: INK,
      letterSpacing: '-1.2px',
      lineHeight: 1
    }
  }, "explore"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      marginTop: 6
    }
  }, "discover amazing meals from ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: ORANGE
    }
  }, "local preppers"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: SURFACE,
      borderRadius: 999,
      padding: '8px 12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 13,
    color: ORANGE
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 12,
      color: INK
    }
  }, "New York, NY"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: SECONDARY,
      fontSize: 10
    }
  }, "\u25BE")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: SURFACE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "7",
    x2: "20",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "17",
    x2: "20",
    y2: "17"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "2.4",
    fill: SURFACE
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "2.4",
    fill: SURFACE
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '16px 20px 0',
      background: SURFACE,
      borderRadius: 18,
      padding: '0 14px',
      height: 52,
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: MUTED,
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      color: MUTED,
      flex: 1
    }
  }, "search meals, cuisines, or preppers"), /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ORANGE,
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      padding: '18px 20px 6px',
      scrollbarWidth: 'none'
    }
  }, CATEGORIES_EXPLORE.map(c => {
    const active = cat === c.key;
    return /*#__PURE__*/React.createElement("div", {
      key: c.key,
      onClick: () => setCat(c.key),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        cursor: 'pointer',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 58,
        height: 58,
        borderRadius: 21,
        background: active ? BRAND_TINT : SURFACE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: active ? `1.5px solid #F6C6AC` : '1.5px solid transparent',
        boxShadow: active ? 'none' : '0 3px 10px rgba(0,0,0,0.05)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon,
      size: 24,
      color: active ? ORANGE : CAT_COLOR[c.key] || INK
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: active ? 700 : 500,
        fontSize: 11.5,
        color: active ? ORANGE : '#374151'
      }
    }, c.label));
  })), /*#__PURE__*/React.createElement(SectionHead, {
    title: "cuisines",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 11,
      overflowX: 'auto',
      padding: '0 20px 4px',
      scrollbarWidth: 'none'
    }
  }, CUISINES.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      width: 132,
      flexShrink: 0,
      borderRadius: 18,
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      height: 108,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `https://images.unsplash.com/${c.img}?auto=format&fit=crop&w=300&q=70`,
    alt: c.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 55%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8
    }
  }, /*#__PURE__*/React.createElement(Heart, {
    size: 26
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 9,
      left: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: 'rgba(255,255,255,0.85)',
      marginTop: 1
    }
  }, c.count, " meals"))))), /*#__PURE__*/React.createElement(SectionHead, {
    title: "top preppers near you",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 13,
      overflowX: 'auto',
      padding: '0 20px 6px',
      scrollbarWidth: 'none'
    }
  }, PREPPERS.map(p => /*#__PURE__*/React.createElement(PrepperCard, {
    key: p.id,
    p: p
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: INK,
      letterSpacing: '-0.4px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7
    }
  }, "popular right now ", /*#__PURE__*/React.createElement(Icon, {
    name: "flame",
    size: 18,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: ORANGE,
      cursor: 'pointer'
    }
  }, "see all")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 13,
      overflowX: 'auto',
      padding: '0 20px 8px',
      scrollbarWidth: 'none'
    }
  }, POPULAR.map((m, i) => /*#__PURE__*/React.createElement(PopularCard, {
    key: i,
    m: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 20px 0',
      background: `linear-gradient(120deg, ${PEACH} 0%, ${PEACH_2} 100%)`,
      borderRadius: 22,
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 23,
      background: ORANGE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 4px 12px rgba(241,95,34,0.35)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9",
    fill: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 15,
      color: INK
    }
  }, "can't decide?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: '#7A5A45',
      marginTop: 2,
      lineHeight: 1.35
    }
  }, "let our chef assistant find the perfect meal for you")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: INK,
      border: 'none',
      borderRadius: 999,
      padding: '10px 14px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12.5,
      color: '#fff'
    }
  }, "surprise me"), /*#__PURE__*/React.createElement(Icon, {
    name: "wand",
    size: 13,
    color: "#fff"
  }))));
}
function BadgeCheck({
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: color,
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 1l2.4 1.8 3-.3 1.2 2.8 2.8 1.2-.3 3L23 12l-1.9 2.4.3 3-2.8 1.2-1.2 2.8-3-.3L12 23l-2.4-1.9-3 .3-1.2-2.8L2.6 17.4l.3-3L1 12l1.9-2.4-.3-3 2.8-1.2L6.6 2.5l3 .3z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 12.5l1.8 1.8 3.5-3.8",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(window, {
  ExploreScreen,
  BadgeCheck
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/ExploreScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/HomeScreen.jsx
try { (() => {
// HomeScreen — consumer home feed ("what are you craving today?")
function HomeScreen({
  onMealPress,
  onTabPress
}) {
  const {
    MEALS,
    CATEGORIES_HOME,
    RECENT_ORDERS,
    PROFILE
  } = window.PREPPA_DATA;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    PEACH,
    PEACH_2,
    BORDER,
    SUCCESS,
    MINT,
    PURPLE,
    YELLOW,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon
  } = window;
  const TW = window.PREPPA_TWEAKS || {};
  const CARD = {
    compact: {
      w: 152,
      img: 116
    },
    comfy: {
      w: 184,
      img: 146
    },
    large: {
      w: 212,
      img: 168
    }
  }[TW.cardSize || 'comfy'];
  const RAD = TW.radius != null ? TW.radius : 22;
  const showBadges = TW.showBadges !== false;
  const GREET = TW.greeting || 'good morning, alex';
  const CAT_COLOR = {
    breakfast: YELLOW,
    lunch: SUCCESS,
    dinner: ORANGE,
    healthy: SUCCESS,
    vegan: PURPLE,
    more: '#9CA3AF'
  };
  const TONE = {
    orange: {
      fg: ORANGE,
      bg: '#FFFFFF'
    },
    green: {
      fg: SUCCESS,
      bg: '#FFFFFF'
    },
    purple: {
      fg: PURPLE,
      bg: '#FFFFFF'
    }
  };
  function Heart({
    size = 30
  }) {
    const [on, setOn] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setOn(!on);
      },
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        background: 'rgba(255,255,255,0.92)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: on ? ORANGE : 'none',
      stroke: on ? ORANGE : '#9CA3AF',
      strokeWidth: "2.2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8z"
    })));
  }
  function MealCard({
    meal
  }) {
    const [hov, setHov] = React.useState(false);
    const tone = meal.badge ? TONE[meal.badge.tone] : null;
    return /*#__PURE__*/React.createElement("div", {
      onClick: () => onMealPress(meal),
      onMouseEnter: () => setHov(true),
      onMouseLeave: () => setHov(false),
      style: {
        width: CARD.w,
        borderRadius: RAD,
        overflow: 'hidden',
        background: SURFACE,
        boxShadow: hov ? '0 14px 28px rgba(0,0,0,0.12)' : '0 4px 14px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        flexShrink: 0,
        transform: hov ? 'translateY(-4px)' : 'none',
        transition: 'transform .18s, box-shadow .18s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        height: CARD.img,
        background: '#FCE9DD',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: meal.image,
      alt: meal.title,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: hov ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform .5s'
      }
    }), showBadges && meal.badge && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 10,
        left: 10,
        background: tone.bg,
        borderRadius: 999,
        padding: '4px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: meal.badge.icon,
      size: 12,
      color: tone.fg
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 10.5,
        color: tone.fg
      }
    }, meal.badge.label)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 9,
        right: 9
      }
    }, /*#__PURE__*/React.createElement(Heart, {
      size: 30
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '11px 13px 13px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 15.5,
        color: INK,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, meal.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 12,
        color: MUTED,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, "by ", meal.prepper), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "star",
      size: 12,
      color: YELLOW
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 12,
        color: '#374151'
      }
    }, meal.rating.toFixed(1)))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 12,
        color: SECONDARY,
        marginTop: 7
      }
    }, meal.time, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: INK
      }
    }, "$", meal.price.toFixed(2)))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px 20px 0',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      cursor: 'pointer',
      marginBottom: 8,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 14,
    color: ORANGE
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12.5,
      color: INK
    }
  }, "New York, NY"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: SECONDARY,
      fontSize: 10
    }
  }, "\u25BE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 13.5,
      color: SECONDARY
    }
  }, GREET), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 27,
      color: INK,
      letterSpacing: '-0.7px',
      lineHeight: 1.1,
      marginTop: 3
    }
  }, "what are you", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ORANGE
    }
  }, "craving today?"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 44,
      height: 44,
      borderRadius: 22,
      background: SURFACE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      cursor: 'pointer',
      flexShrink: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.7 21a2 2 0 0 1-3.4 0"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      minWidth: 17,
      height: 17,
      padding: '0 4px',
      borderRadius: 9,
      background: ORANGE,
      border: '2px solid ' + CANVAS,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 9.5,
      fontWeight: 800,
      fontFamily: FONT_BODY
    }
  }, "3")))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '18px 20px 0',
      background: SURFACE,
      borderRadius: 18,
      padding: '0 8px 0 16px',
      height: 52,
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: MUTED,
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      color: MUTED,
      flex: 1
    }
  }, "Search meals, cuisines, or preppers\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 12,
      background: BRAND_TINT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ORANGE,
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "7",
    x2: "20",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "17",
    x2: "20",
    y2: "17"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "2.4",
    fill: CANVAS
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "2.4",
    fill: CANVAS
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      padding: '18px 20px 6px',
      scrollbarWidth: 'none'
    }
  }, CATEGORIES_HOME.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: c.key,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: 22,
      background: SURFACE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 3px 10px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 26,
    color: CAT_COLOR[c.key] || INK
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 11.5,
      color: '#374151'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '16px 20px 0',
      background: `linear-gradient(120deg, ${PEACH} 0%, ${PEACH_2} 100%)`,
      borderRadius: 24,
      padding: '18px 0 18px 18px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 132
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: INK,
      letterSpacing: '-0.5px'
    }
  }, "chef surprise me"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12.5,
      color: '#7A5A45',
      marginTop: 4,
      lineHeight: 1.4
    }
  }, "tell us your mood,", /*#__PURE__*/React.createElement("br", null), "we'll pick the perfect meal"), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 12,
      background: INK,
      border: 'none',
      borderRadius: 999,
      padding: '9px 16px',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 13,
      color: '#fff'
    }
  }, "surprise me"), /*#__PURE__*/React.createElement(Icon, {
    name: "wand",
    size: 14,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 130,
      height: 130,
      flexShrink: 0,
      marginRight: -14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=70",
    alt: "bowl",
    style: {
      width: 130,
      height: 130,
      borderRadius: '50%',
      objectFit: 'cover',
      boxShadow: '0 8px 20px rgba(0,0,0,0.18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 4,
      left: -8
    }
  }, /*#__PURE__*/React.createElement(Heart, {
    size: 30
  })))), /*#__PURE__*/React.createElement(SectionHead, {
    title: "recommended for you",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 13,
      overflowX: 'auto',
      padding: '0 20px 8px',
      scrollbarWidth: 'none'
    }
  }, MEALS.slice(0, 4).map(m => /*#__PURE__*/React.createElement(MealCard, {
    key: m.id,
    meal: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 20px 0',
      background: MINT,
      borderRadius: 20,
      padding: '12px 12px 12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      background: SUCCESS,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gift",
    size: 20,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 14,
      color: '#14532d'
    }
  }, "you have ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: SUCCESS
    }
  }, "350 points")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: '#3f6212',
      marginTop: 1
    }
  }, "unlock rewards & save on your next order")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: INK,
      border: 'none',
      borderRadius: 999,
      padding: '9px 13px',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 12,
      color: '#fff'
    }
  }, "view rewards"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: '#fff'
    }
  }, "\u203A"))), /*#__PURE__*/React.createElement(SectionHead, {
    title: "order again",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, RECENT_ORDERS.slice(0, 2).map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    onClick: () => onMealPress(MEALS.find(m => m.title.includes(o.title.split(' ')[1])) || MEALS[3]),
    style: {
      background: SURFACE,
      borderRadius: 20,
      padding: 11,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: o.image,
    alt: o.title,
    style: {
      width: 56,
      height: 56,
      borderRadius: 15,
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 14,
      color: INK
    }
  }, o.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: MUTED,
      marginTop: 1
    }
  }, "by ", o.by), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: SECONDARY,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: INK
    }
  }, "$", o.price.toFixed(2)), " \xB7 delivered on ", o.date)), /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
    },
    style: {
      background: ORANGE,
      border: 'none',
      borderRadius: 999,
      padding: '9px 15px',
      cursor: 'pointer',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12.5,
      color: '#fff',
      flexShrink: 0
    }
  }, "order again"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: MUTED,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: '1px',
      flexShrink: 0,
      cursor: 'pointer'
    }
  }, "\u22EE")))));
}
function SectionHead({
  title,
  T
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: T.INK,
      letterSpacing: '-0.4px'
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: T.ORANGE,
      cursor: 'pointer'
    }
  }, "see all"));
}
Object.assign(window, {
  HomeScreen,
  SectionHead
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/Icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Icons.jsx — custom SVG icon set for the Preppa UI kit (no emoji)
// Usage: <Icon name="bell" size={20} color="#1A1A1A" />  •  fill icons accept color too
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  stroke = 1.9,
  fill
}) {
  const s = {
    width: size,
    height: size,
    display: 'block',
    flexShrink: 0
  };
  const common = {
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  const P = {
    // line icons
    sun: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
    })),
    bowl: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3.5 11h17a8.5 8.5 0 0 1-17 0z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 8c0-1.5 1-2.5 1-3.5M12 7.5c0-2 1.2-3 1.2-4.2M16 8c0-1.5 1-2.2 1-3.2"
    })),
    cloche: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 17h18M4.5 17a7.5 7.5 0 0 1 15 0M12 6.5V5M9.5 5h5"
    })),
    leaf: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 9-4 14-9 14a6 6 0 0 1-2 0z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21c3-5 6-7 10-8"
    })),
    sprout: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M12 20v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 13C12 9 9 7 5 7c0 4 3 6 7 6z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 13c0-3 2.5-5 6-5 0 3.5-2.5 5-6 5z"
    })),
    cookie: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1.8 1.8 0 0 0-1-1z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "11",
      r: ".6",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "13",
      cy: "15",
      r: ".6",
      fill: color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "15.5",
      cy: "11.5",
      r: ".6",
      fill: color
    })),
    cake: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M4 20h16M5 20v-7h14v7M5 13a2 2 0 0 1 2-2 2 2 0 0 1 2.5 0 2 2 0 0 1 2.5 0 2 2 0 0 1 2.5 0 2 2 0 0 1 2.5 0"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 8.5V7M12 4.5v.5"
    })),
    grid: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("rect", {
      x: "3.5",
      y: "3.5",
      width: "7",
      height: "7",
      rx: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "13.5",
      y: "3.5",
      width: "7",
      height: "7",
      rx: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3.5",
      y: "13.5",
      width: "7",
      height: "7",
      rx: "2"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "13.5",
      y: "13.5",
      width: "7",
      height: "7",
      rx: "2"
    })),
    more: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "5",
      cy: "12",
      r: "1.3",
      fill: color,
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "1.3",
      fill: color,
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "19",
      cy: "12",
      r: "1.3",
      fill: color,
      stroke: "none"
    })),
    bell: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M13.7 21a2 2 0 0 1-3.4 0"
    })),
    pin: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    sliders: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "7",
      x2: "20",
      y2: "7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "17",
      x2: "20",
      y2: "17"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "2.4",
      fill: fill || '#fff'
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "15",
      cy: "17",
      r: "2.4",
      fill: fill || '#fff'
    })),
    search: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    scan: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"
    })),
    wand: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M15 4V2M15 10V8M12.5 5.5h-2M19.5 5.5h-2M5 21l11-11-2-2L3 19z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 7.5L18 9"
    })),
    gift: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("rect", {
      x: "3.5",
      y: "9",
      width: "17",
      height: "4",
      rx: "1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 13v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7M12 9v12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 9S11 4.5 8.5 4.5 6 9 12 9zM12 9s1-4.5 3.5-4.5S18 9 12 9z"
    })),
    crown: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 8l3.5 3L12 5l5.5 6L21 8l-1.5 10h-15z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 21h14"
    })),
    chefhat: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M6 14a4 4 0 0 1-1-7.9 4.5 4.5 0 0 1 8.5-1.6A4 4 0 0 1 18 6.1 4 4 0 0 1 18 14z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 14v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5"
    })),
    camera: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "13",
      r: "4"
    })),
    pencil: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"
    })),
    settings: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    })),
    compass: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9.5"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9",
      fill: fill || 'none'
    })),
    clock: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 7 12 12 15.5 14"
    })),
    bookmark: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
    })),
    ticket: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.5 9.2l.6 1.4 1.5.1-1.2 1 .4 1.5-1.3-.8-1.3.8.4-1.5-1.2-1 1.5-.1z",
      fill: fill || 'none'
    })),
    card: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("rect", {
      x: "2.5",
      y: "5",
      width: "19",
      height: "14",
      rx: "2.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "2.5",
      y1: "9.5",
      x2: "21.5",
      y2: "9.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "14.5",
      x2: "10",
      y2: "14.5"
    })),
    help: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9.2 9.2a2.8 2.8 0 0 1 5.4 1c0 1.8-2.6 2-2.6 4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "17.2",
      r: ".7",
      fill: color,
      stroke: "none"
    })),
    moon: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8z"
    })),
    bag: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M5 8h14l-1 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 8V6a3 3 0 0 1 6 0v2"
    })),
    dollar: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "2.5",
      x2: "12",
      y2: "21.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16.5 6.5H9.8a3.3 3.3 0 0 0 0 6.5h4.4a3.3 3.3 0 0 1 0 6.5H7"
    })),
    users: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "3.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11"
    })),
    calendar: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4.5",
      width: "18",
      height: "16.5",
      rx: "2.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 9h18M8 2.5v4M16 2.5v4"
    })),
    wallet: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 7.5A2.5 2.5 0 0 1 5.5 5H18a1 1 0 0 1 1 1v1.5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "7.5",
      width: "18",
      height: "12",
      rx: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16.5",
      cy: "13.5",
      r: "1.3",
      fill: color,
      stroke: "none"
    })),
    broadcast: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2",
      fill: color,
      stroke: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M5 5a9.5 9.5 0 0 0 0 14M19 19a9.5 9.5 0 0 0 0-14"
    })),
    plus: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    chat: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"
    })),
    menu: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "7",
      x2: "20",
      y2: "7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "12",
      x2: "20",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "17",
      x2: "20",
      y2: "17"
    })),
    wine: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M8 3h8l-.5 5a3.5 3.5 0 0 1-7 0zM12 13.5V20M8.5 20h7"
    })),
    party: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("path", {
      d: "M3 21l5.5-13L17 16.5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 3s.5 1.5-.5 2.5M18 6s1.5-.5 2.5.5M16 10c1.5 0 2.5 1 2.5 1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "20",
      cy: "12.5",
      r: ".7",
      fill: color,
      stroke: "none"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "13",
      cy: "3",
      r: ".7",
      fill: color,
      stroke: "none"
    })),
    chevron: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("polyline", {
      points: "9 6 15 12 9 18"
    })),
    arrow: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "13 6 19 12 13 18"
    })),
    share: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "5",
      r: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "12",
      r: "2.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "19",
      r: "2.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8.1",
      y1: "10.7",
      x2: "15.9",
      y2: "6.3"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8.1",
      y1: "13.3",
      x2: "15.9",
      y2: "17.7"
    })),
    refresh: /*#__PURE__*/React.createElement("g", common, /*#__PURE__*/React.createElement("polyline", {
      points: "21 4 21 9 16 9"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "3 20 3 15 8 15"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.5 9a8 8 0 0 0-14-2.5L3 9M21 15l-2.5 2.5a8 8 0 0 1-14-2.5"
    })),
    // solid / fill-forward icons
    flame: /*#__PURE__*/React.createElement("path", {
      d: "M12 2.5c2 3.2 1 5-.4 6.4-1 1-2 2-2 3.6 0 .9.4 1.6 1 2.1-.2-1.6.6-2.8 1.7-3.4-.3 1.4.2 2.5 1.1 3.3 1.3 1.1 2 2.3 2 3.9A5.4 5.4 0 0 1 12 23a5.5 5.5 0 0 1-5.5-5.5c0-3 1.8-4.8 3.2-6.6C11.5 8.6 12.6 6.3 12 2.5z",
      fill: color
    }),
    sparkle: /*#__PURE__*/React.createElement("path", {
      d: "M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7z",
      fill: color
    }),
    bolt: /*#__PURE__*/React.createElement("path", {
      d: "M13 2L4 14h6l-1 8 9-12h-6z",
      fill: color
    }),
    trophy: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M7 4h10v4a5 5 0 0 1-10 0z",
      fill: color
    }), /*#__PURE__*/React.createElement("path", {
      d: "M7 5H4.5a2.5 2.5 0 0 0 2.5 4M17 5h2.5a2.5 2.5 0 0 1-2.5 4",
      fill: "none",
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 13v3M9 20h6M10 16h4l.5 4h-5z",
      fill: color
    })),
    star: /*#__PURE__*/React.createElement("path", {
      d: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9z",
      fill: color
    }),
    heartSolid: /*#__PURE__*/React.createElement("path", {
      d: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.6a5.5 5.5 0 0 0 0-7.8z",
      fill: color
    }),
    play: /*#__PURE__*/React.createElement("path", {
      d: "M6 4l14 8-14 8z",
      fill: color
    }),
    check: /*#__PURE__*/React.createElement("polyline", _extends({
      points: "4 12.5 9.5 18 20 6"
    }, common))
  };
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    style: s
  }, P[name] || P.more);
}

// Verified badge (scalloped) used on names
function VerifiedBadge({
  color = '#F15F22',
  size = 15
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    style: {
      flexShrink: 0,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 1l2.4 1.8 3-.3 1.2 2.8 2.8 1.2-.3 3L23 12l-1.9 2.4.3 3-2.8 1.2-1.2 2.8-3-.3L12 23l-2.4-1.9-3 .3-1.2-2.8L2.6 17.4l.3-3L1 12l1.9-2.4-.3-3 2.8-1.2L6.6 2.5l3 .3z",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12.2l2.3 2.3 4.7-5",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
Object.assign(window, {
  Icon,
  VerifiedBadge
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/MealDetailScreen.jsx
try { (() => {
// MealDetailScreen — full meal detail with add-to-cart CTA
function MealDetailScreen({
  meal,
  onBack,
  onAddToCart,
  onPrepperPress
}) {
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    BORDER,
    SUCCESS,
    YELLOW,
    FONT_DISPLAY,
    FONT_BODY
  } = window.PREPPA_THEME;
  const {
    Icon
  } = window;
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  if (!meal) return null;
  function handleAdd() {
    setAdded(true);
    if (onAddToCart) onAddToCart(meal, qty);
    setTimeout(() => setAdded(false), 2000);
  }
  const REVIEWS = [{
    name: 'Marcus T.',
    rating: 5,
    text: 'Absolutely incredible — best jerk I\'ve had outside Jamaica. Portions are generous!',
    date: '3 days ago'
  }, {
    name: 'Priya S.',
    rating: 5,
    text: 'Fresh ingredients, great packaging. Will definitely order again.',
    date: '1 week ago'
  }, {
    name: 'James O.',
    rating: 4,
    text: 'Really good! The sauce is chef\'s kiss. Delivery was quick too.',
    date: '2 weeks ago'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 100,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 260
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: meal.image,
    alt: meal.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 50%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      right: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onBack,
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: 'rgba(255,255,255,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      lineHeight: 1
    }
  }, "\u2039")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: 'rgba(255,255,255,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heartSolid",
    size: 16,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 19,
      background: 'rgba(255,255,255,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, "\u2197"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      marginTop: -20,
      padding: '20px 20px 0',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 22,
      color: INK,
      letterSpacing: '-0.5px',
      flex: 1
    }
  }, meal.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 22,
      color: ORANGE
    }
  }, "$", meal.price.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 14,
    color: YELLOW || '#F59E0B'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: '#374151'
    }
  }, meal.rating.toFixed(1)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: MUTED
    }
  }, "(", meal.reviews, " reviews)"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 4,
      height: 4,
      borderRadius: 2,
      background: '#D1D5DB'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: MUTED,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 13,
    color: MUTED
  }), " ", meal.time)), /*#__PURE__*/React.createElement("div", {
    onClick: () => onPrepperPress && onPrepperPress(meal),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      background: CANVAS,
      borderRadius: 14,
      marginBottom: 16,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: BRAND_TINT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chefhat",
    size: 19,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 14,
      color: INK
    }
  }, meal.prepper), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: MUTED,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "Verified kitchen \xB7 4.9 ", /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 11,
    color: YELLOW || '#F59E0B'
  }), " \xB7 128 orders")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12.5,
      color: ORANGE,
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }
  }, "view kitchen ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "\u203A"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    }
  }, [{
    lbl: 'calories',
    val: '480'
  }, {
    lbl: 'protein',
    val: '38g'
  }, {
    lbl: 'carbs',
    val: '52g'
  }, {
    lbl: 'fat',
    val: '14g'
  }].map(m => /*#__PURE__*/React.createElement("div", {
    key: m.lbl,
    style: {
      flex: 1,
      background: CANVAS,
      borderRadius: 12,
      padding: '10px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 17,
      color: INK
    }
  }, m.val), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 10,
      color: MUTED,
      marginTop: 2
    }
  }, m.lbl)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      color: SECONDARY,
      lineHeight: 1.55,
      marginBottom: 18
    }
  }, "A crowd favourite \u2014 ", meal.title.toLowerCase(), " made fresh to order with locally-sourced ingredients. Served with your choice of rice or quinoa. Allergens: fish, soy. Gluten-free on request."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7,
      marginBottom: 20
    }
  }, ['Gluten-Free', 'High-Protein', 'Fresh Daily', 'Dairy-Free'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 11,
      color: SUCCESS,
      background: '#DCFCE7',
      padding: '4px 10px',
      borderRadius: 999
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 18,
      color: INK,
      letterSpacing: '-0.4px',
      marginBottom: 12
    }
  }, "reviews"), REVIEWS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: SURFACE,
      borderRadius: 16,
      padding: '12px 14px',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 15,
      background: BRAND_TINT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12,
      color: ORANGE
    }
  }, r.name[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: INK
    }
  }, r.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3
    }
  }, Array.from({
    length: r.rating
  }).map((_, k) => /*#__PURE__*/React.createElement(Icon, {
    key: k,
    name: "star",
    size: 11,
    color: YELLOW || '#F59E0B'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: MUTED,
      marginLeft: 4
    }
  }, r.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      lineHeight: 1.5
    }
  }, r.text)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      background: SURFACE,
      padding: '12px 20px 24px',
      borderTop: '1px solid #F3F4F6',
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      boxShadow: '0 -4px 16px rgba(0,0,0,0.07)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      borderRadius: 12,
      border: '1.5px solid #E5E7EB',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => Math.max(1, q - 1)),
    style: {
      width: 36,
      height: 40,
      border: 'none',
      background: '#fff',
      fontSize: 18,
      cursor: 'pointer',
      color: INK,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\u2212"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 15,
      color: INK,
      padding: '0 14px',
      minWidth: 28,
      textAlign: 'center'
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => q + 1),
    style: {
      width: 36,
      height: 40,
      border: 'none',
      background: '#fff',
      fontSize: 18,
      cursor: 'pointer',
      color: ORANGE,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "+")), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdd,
    style: {
      flex: 1,
      height: 50,
      borderRadius: 999,
      background: added ? SUCCESS : ORANGE,
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      transition: 'background 0.2s'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, added ? '✓ added to cart' : `add to cart · $${(meal.price * qty).toFixed(2)}`))));
}
Object.assign(window, {
  MealDetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/MealDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/MoreScreens.jsx
try { (() => {
// Feeds + Experiences — secondary consumer tabs
function FeedsScreen({
  onMealPress
}) {
  const {
    MEALS,
    PREPPERS,
    img
  } = window.PREPPA_DATA;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon
  } = window;
  const REELS = [{
    id: 'f1',
    prepper: PREPPERS[0],
    caption: 'plating tonight\u2019s honey garlic salmon',
    meal: MEALS[0],
    likes: '2.4k',
    comments: 182,
    img: 'photo-1467003909585-2f8a72700288'
  }, {
    id: 'f2',
    prepper: PREPPERS[1],
    caption: 'the jerk pasta everyone keeps reordering',
    meal: MEALS[1],
    likes: '5.1k',
    comments: 309,
    img: 'photo-1473093295043-cdd812d0e601'
  }, {
    id: 'f3',
    prepper: PREPPERS[3],
    caption: 'fresh wellness bowls, prepped with love',
    meal: MEALS[2],
    likes: '1.8k',
    comments: 96,
    img: 'photo-1512621776951-a57141f2eefd'
  }];
  function Action({
    name,
    label
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 21,
        background: 'rgba(255,255,255,0.18)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: name,
      size: 20,
      color: "#fff"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 11,
        color: '#fff'
      }
    }, label));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 28,
      color: INK,
      letterSpacing: '-1px'
    }
  }, "feeds"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      marginTop: 2
    }
  }, "watch ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: ORANGE
    }
  }, "local preppers"), " cook live")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      background: SURFACE,
      borderRadius: 999,
      padding: 4,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: ORANGE,
      borderRadius: 999,
      padding: '6px 13px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12,
      color: '#fff'
    }
  }, "for you"), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 11px',
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 12,
      color: SECONDARY
    }
  }, "following"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, REELS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    onClick: () => onMealPress(r.meal),
    style: {
      position: 'relative',
      borderRadius: 26,
      overflow: 'hidden',
      height: 420,
      cursor: 'pointer',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `https://images.unsplash.com/${r.img}?auto=format&fit=crop&w=600&q=70`,
    alt: r.caption,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 42%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      left: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'rgba(0,0,0,0.32)',
      backdropFilter: 'blur(8px)',
      borderRadius: 999,
      padding: '5px 12px 5px 5px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: r.prepper.image,
    alt: r.prepper.name,
    style: {
      width: 28,
      height: 28,
      borderRadius: 14,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 13,
      color: '#fff'
    }
  }, r.prepper.name), /*#__PURE__*/React.createElement("span", {
    style: {
      background: ORANGE,
      borderRadius: 999,
      padding: '3px 9px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 10,
      color: '#fff'
    }
  }, "follow")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      right: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      background: 'rgba(239,68,68,0.92)',
      borderRadius: 999,
      padding: '4px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 3,
      background: '#fff'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 800,
      fontSize: 10,
      color: '#fff',
      letterSpacing: '0.04em'
    }
  }, "LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Action, {
    name: "heartSolid",
    label: r.likes
  }), /*#__PURE__*/React.createElement(Action, {
    name: "chat",
    label: String(r.comments)
  }), /*#__PURE__*/React.createElement(Action, {
    name: "share",
    label: "share"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 78,
      bottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13.5,
      color: '#fff',
      lineHeight: 1.4
    }
  }, r.caption), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      marginTop: 10,
      background: 'rgba(255,255,255,0.95)',
      borderRadius: 14,
      padding: '7px 8px 7px 7px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: r.meal.image,
    alt: "",
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 12.5,
      color: INK
    }
  }, r.meal.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 12,
      color: ORANGE
    }
  }, "$", r.meal.price.toFixed(2)), /*#__PURE__*/React.createElement("span", {
    style: {
      background: ORANGE,
      borderRadius: 999,
      padding: '5px 11px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 11,
      color: '#fff'
    }
  }, "order")))))));
}
function ExperiencesScreen() {
  const {
    img
  } = window.PREPPA_DATA;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    PEACH,
    PEACH_2,
    SUCCESS,
    PURPLE,
    YELLOW,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon
  } = window;
  const CATS = [{
    label: 'cooking classes',
    icon: 'chefhat',
    tint: '#FDEDE4',
    color: ORANGE
  }, {
    label: 'private chefs',
    icon: 'cloche',
    tint: '#EDE9FE',
    color: PURPLE
  }, {
    label: 'catering',
    icon: 'party',
    tint: '#FEF3C7',
    color: YELLOW
  }, {
    label: 'tastings',
    icon: 'wine',
    tint: '#FCE7F0',
    color: '#EC4899'
  }];
  const EVENTS = [{
    id: 'e1',
    title: 'hands-on pasta night',
    host: 'Chef Kelsey',
    when: 'fri · 7:00 pm',
    spots: '4 spots left',
    price: 65,
    tag: 'class',
    tone: PURPLE,
    img: 'photo-1473093295043-cdd812d0e601'
  }, {
    id: 'e2',
    title: 'caribbean supper club',
    host: 'Island Bites',
    when: 'sat · 6:30 pm',
    spots: 'sold out',
    price: 48,
    tag: 'tasting',
    tone: PINKish(),
    img: 'photo-1546069901-ba9599a7e63c'
  }, {
    id: 'e3',
    title: 'weekend brunch catering',
    host: 'Green Plates',
    when: 'book any date',
    spots: 'up to 20 guests',
    price: 240,
    tag: 'catering',
    tone: YELLOW,
    img: 'photo-1512621776951-a57141f2eefd'
  }];
  function PINKish() {
    return '#EC4899';
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 28,
      color: INK,
      letterSpacing: '-1px'
    }
  }, "experiences"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      marginTop: 2
    }
  }, "classes, private chefs & ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: ORANGE
    }
  }, "catering"), " near you")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '16px 20px 0',
      borderRadius: 24,
      overflow: 'hidden',
      position: 'relative',
      height: 168,
      boxShadow: '0 8px 22px rgba(0,0,0,0.14)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img('photo-1556910103-1c02745aae4d', 700),
    alt: "experience",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(105deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.1) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      top: 0,
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: 220
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 'fit-content',
      background: ORANGE,
      borderRadius: 999,
      padding: '4px 11px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 10.5,
      color: '#fff'
    }
  }, "featured"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 21,
      color: '#fff',
      letterSpacing: '-0.5px',
      lineHeight: 1.1,
      marginTop: 9
    }
  }, "chef's table:", /*#__PURE__*/React.createElement("br", null), "a night in lagos"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: 'rgba(255,255,255,0.85)',
      marginTop: 7
    }
  }, "6-course tasting \xB7 from $85"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      padding: '18px 20px 6px',
      scrollbarWidth: 'none'
    }
  }, CATS.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7,
      cursor: 'pointer',
      flexShrink: 0,
      width: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 58,
      height: 58,
      borderRadius: 21,
      background: c.tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 24,
    color: c.color
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 11,
      color: INK,
      textAlign: 'center',
      lineHeight: 1.2
    }
  }, c.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: INK,
      letterSpacing: '-0.4px'
    }
  }, "upcoming near you")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, EVENTS.map(e => /*#__PURE__*/React.createElement("div", {
    key: e.id,
    style: {
      background: SURFACE,
      borderRadius: 20,
      padding: 11,
      display: 'flex',
      gap: 13,
      cursor: 'pointer',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `https://images.unsplash.com/${e.img}?auto=format&fit=crop&w=240&q=70`,
    alt: e.title,
    style: {
      width: 92,
      height: 92,
      borderRadius: 16,
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: e.tone + '22',
      borderRadius: 999,
      padding: '2px 9px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 10,
      color: e.tone
    }
  }, e.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: e.spots === 'sold out' ? '#EF4444' : SUCCESS,
      fontWeight: 600
    }
  }, e.spots)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 15,
      color: INK,
      marginTop: 6
    }
  }, e.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: MUTED,
      marginTop: 2
    }
  }, "with ", e.host), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'auto',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: SECONDARY,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 13,
    color: SECONDARY
  }), " ", e.when), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 15,
      color: ORANGE
    }
  }, "$", e.price)))))));
}
Object.assign(window, {
  FeedsScreen,
  ExperiencesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/MoreScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/ProfileScreen.jsx
try { (() => {
// ProfileScreen — consumer profile / account ("alex morgan")
function ProfileScreen({
  onSignOut
}) {
  const {
    PROFILE,
    PLAN,
    RECENT_ORDERS
  } = window.PREPPA_DATA;
  const {
    BadgeCheck
  } = window;
  const T = window.PREPPA_THEME;
  const {
    ORANGE,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    PEACH,
    PEACH_2,
    BORDER,
    SUCCESS,
    PURPLE,
    YELLOW,
    FONT_DISPLAY,
    FONT_BODY
  } = T;
  const {
    Icon
  } = window;
  const [dark, setDark] = React.useState(false);
  const STATUS_TONE = {
    green: {
      fg: SUCCESS,
      bg: '#E7F6EC'
    },
    orange: {
      fg: ORANGE,
      bg: '#FDEDE4'
    }
  };
  function HubRow({
    item
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '13px 4px',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 12,
        background: item.accent ? BRAND_TINT : '#F3F2EF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: item.icon,
      size: 17,
      color: item.accent ? ORANGE : SECONDARY
    }), item.dot && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 9,
        height: 9,
        borderRadius: 5,
        background: ORANGE,
        border: '2px solid ' + SURFACE
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontWeight: 600,
        fontSize: 13,
        color: INK,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, item.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11,
        color: MUTED,
        marginTop: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, item.sub)), item.toggle ? /*#__PURE__*/React.createElement("div", {
      onClick: e => {
        e.stopPropagation();
        setDark(!dark);
      },
      style: {
        width: 38,
        height: 22,
        borderRadius: 11,
        background: dark ? ORANGE : '#D9D6D0',
        padding: 2,
        display: 'flex',
        justifyContent: dark ? 'flex-end' : 'flex-start',
        transition: 'all .15s',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 18,
        height: 18,
        borderRadius: 9,
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }
    })) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: MUTED,
        fontSize: 16,
        flexShrink: 0
      }
    }, "\u203A"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: CANVAS,
      overflowY: 'auto',
      paddingBottom: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      background: SURFACE,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
  }))), /*#__PURE__*/React.createElement("button", {
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 20,
      background: SURFACE,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: INK,
    strokeWidth: "1.9",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.7 21a2 2 0 0 1-3.4 0"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      minWidth: 18,
      height: 18,
      padding: '0 4px',
      borderRadius: 9,
      background: ORANGE,
      border: '2px solid ' + CANVAS,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 800,
      fontFamily: FONT_BODY
    }
  }, "3")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '8px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 44,
      padding: 3,
      background: `linear-gradient(135deg, #FF9A5A, ${ORANGE})`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: PROFILE.avatar,
    alt: PROFILE.name,
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 41,
      objectFit: 'cover',
      border: '3px solid ' + CANVAS
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 28,
      height: 28,
      borderRadius: 14,
      background: ORANGE,
      border: '3px solid ' + CANVAS,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 22,
      color: INK,
      letterSpacing: '-0.6px',
      whiteSpace: 'nowrap'
    }
  }, PROFILE.name), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ORANGE,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      color: SECONDARY,
      marginTop: 3
    }
  }, PROFILE.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: MUTED,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 500,
      fontSize: 12.5,
      color: SECONDARY
    }
  }, PROFILE.location)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 9,
      padding: '14px 20px 0',
      flexWrap: 'wrap'
    }
  }, PROFILE.tags.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: SURFACE,
      borderRadius: 999,
      padding: '7px 13px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 14,
    color: t.color
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 12.5,
      color: INK
    }
  }, t.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '16px 20px 0',
      background: `linear-gradient(120deg, ${PEACH} 0%, ${PEACH_2} 100%)`,
      borderRadius: 22,
      padding: '16px 0 16px 18px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: '#7A5A45'
    }
  }, "your balance"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 26,
      color: ORANGE,
      letterSpacing: '-0.8px',
      marginTop: 2
    }
  }, PROFILE.balance.toLocaleString(), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      marginLeft: 3
    }
  }, "pts")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 3,
      marginTop: 3,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 11.5,
      color: '#7A5A45'
    }
  }, "$", PROFILE.rewards.toFixed(2), " in rewards"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: '#7A5A45'
    }
  }, "\u203A"))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'rgba(122,90,69,0.22)',
      margin: '2px 14px 2px 6px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1.05
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 12,
      color: '#7A5A45'
    }
  }, "next tier"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 16,
    color: YELLOW
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 15,
      color: INK,
      whiteSpace: 'nowrap'
    }
  }, PROFILE.tier)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 4,
      background: 'rgba(122,90,69,0.18)',
      marginTop: 9,
      overflow: 'hidden',
      maxWidth: 130
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: PROFILE.progress * 100 + '%',
      height: '100%',
      borderRadius: 4,
      background: ORANGE
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: '#7A5A45',
      marginTop: 6
    }
  }, PROFILE.toGo, " pts to go"))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 28,
      background: 'rgba(241,95,34,0.14)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      marginLeft: 4,
      zIndex: 1,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gift",
    size: 30,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 14,
      right: 16,
      opacity: 0.55
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 13,
    color: ORANGE
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 18,
      right: 74,
      opacity: 0.4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 10,
    color: ORANGE
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 20px 0',
      background: SURFACE,
      borderRadius: 20,
      padding: '15px 8px',
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0 3px 12px rgba(0,0,0,0.04)'
    }
  }, PROFILE.quicklinks.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.label,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer',
      textAlign: 'center',
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 20,
      background: q.tint,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: q.icon,
    size: 17,
    color: q.color
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: 10,
      color: INK,
      lineHeight: 1.15
    }
  }, q.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 9,
      color: MUTED
    }
  }, q.sub)))), /*#__PURE__*/React.createElement(SectionRow, {
    title: "meal plans & subscriptions",
    action: "view all",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 20px',
      background: SURFACE,
      borderRadius: 20,
      padding: 11,
      display: 'flex',
      gap: 12,
      cursor: 'pointer',
      boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: PLAN.image,
    alt: PLAN.title,
    style: {
      width: 76,
      height: 76,
      borderRadius: 16,
      objectFit: 'cover',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 14,
      color: INK
    }
  }, PLAN.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: MUTED,
      marginTop: 1
    }
  }, "by ", PLAN.by)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexShrink: 0
    }
  }, PLAN.members.map((m, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: m,
    alt: "",
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      objectFit: 'cover',
      border: '2px solid ' + SURFACE,
      marginLeft: i ? -8 : 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 11,
      background: '#F3F2EF',
      border: '2px solid ' + SURFACE,
      marginLeft: -8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 8.5,
      color: SECONDARY
    }
  }, "+3")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#E7F6EC',
      borderRadius: 999,
      padding: '3px 9px',
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 10.5,
      color: SUCCESS
    }
  }, "active"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11,
      color: SECONDARY
    }
  }, PLAN.next)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_BODY,
      fontSize: 11.5,
      color: SECONDARY,
      marginTop: 7
    }
  }, "4 meals \xB7 2 snacks \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: INK
    }
  }, "weekly")))), /*#__PURE__*/React.createElement(SectionRow, {
    title: "recent orders",
    action: "view all orders",
    T: T
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      padding: '0 20px 4px',
      scrollbarWidth: 'none'
    }
  }, RECENT_ORDERS.map(o => {
    const tone = STATUS_TONE[o.tone];
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      style: {
        width: 232,
        flexShrink: 0,
        background: SURFACE,
        borderRadius: 18,
        padding: 11,
        display: 'flex',
        gap: 11,
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 3px 12px rgba(0,0,0,0.05)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: o.image,
      alt: o.title,
      style: {
        width: 58,
        height: 58,
        borderRadius: 14,
        objectFit: 'cover',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 13.5,
        color: INK
      }
    }, o.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11,
        color: MUTED,
        marginTop: 1
      }
    }, "by ", o.by), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        background: tone.bg,
        borderRadius: 999,
        padding: '2px 8px',
        fontFamily: FONT_BODY,
        fontWeight: 700,
        fontSize: 9.5,
        color: tone.fg
      }
    }, o.status)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: FONT_BODY,
        fontSize: 11,
        color: SECONDARY,
        marginTop: 5
      }
    }, o.date, " \xB7 ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: INK
      }
    }, "$", o.price.toFixed(2)))), /*#__PURE__*/React.createElement("span", {
      style: {
        color: MUTED,
        fontSize: 15,
        flexShrink: 0
      }
    }, "\u203A"));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: INK,
      letterSpacing: '-0.4px'
    }
  }, "your hub")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '0 20px',
      background: SURFACE,
      borderRadius: 20,
      padding: '6px 16px',
      boxShadow: '0 3px 12px rgba(0,0,0,0.04)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      columnGap: 18
    }
  }, PROFILE.hub.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: item.label,
    style: {
      borderBottom: i < PROFILE.hub.length - 2 ? '1px solid ' + BORDER : 'none'
    }
  }, /*#__PURE__*/React.createElement(HubRow, {
    item: item
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onSignOut,
    style: {
      width: '100%',
      background: '#FCEEEE',
      border: 'none',
      borderRadius: 16,
      padding: '13px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#EF4444",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "16 17 21 12 16 7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "9",
    y2: "12"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: FONT_BODY,
      fontWeight: 700,
      fontSize: 14,
      color: '#EF4444'
    }
  }, "sign out"))));
}
function SectionRow({
  title,
  action,
  T
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 13px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.FONT_DISPLAY,
      fontWeight: 800,
      fontSize: 19,
      color: T.INK,
      letterSpacing: '-0.4px'
    },
    dangerouslySetInnerHTML: {
      __html: title
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: T.FONT_BODY,
      fontWeight: 600,
      fontSize: 13,
      color: T.ORANGE,
      cursor: 'pointer'
    }
  }, action));
}
Object.assign(window, {
  ProfileScreen,
  SectionRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/ProfileScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/shared.jsx
try { (() => {
// Shared mock data & theme for the Preppa consumer UI kit
const img = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

// ── Brand palette ────────────────────────────────────────────
const ORANGE = '#F15F22';
const ORANGE_DK = '#D9430F';
const INK = '#1A1A1A';
const MUTED = '#9CA3AF';
const SECONDARY = '#6B7280';
const CANVAS = '#F6F5F2'; // warm cream app background
const SURFACE = '#FFFFFF';
const BRAND_TINT = '#FDEDE4';
const PEACH = '#FBE3CE'; // surprise-me banner
const PEACH_2 = '#F8D3AE';
const BORDER = '#ECEAE5';
const SUCCESS = '#16A34A';
const MINT = '#E7F6EC';
const PURPLE = '#8B5CF6';
const PINK = '#EC4899';
const YELLOW = '#F59E0B';
const BLUE = '#3B82F6';
const FONT_DISPLAY = "'Poppins', system-ui, sans-serif"; // rounded geometric — matches reference headings
const FONT_BODY = "'Plus Jakarta Sans', system-ui, sans-serif";

// ── Meals ────────────────────────────────────────────────────
const MEALS = [{
  id: '1',
  title: 'honey garlic salmon',
  prepper: "kelsi's kitchen",
  rating: 4.8,
  reviews: 128,
  price: 14.99,
  time: '30–40 min',
  image: img('photo-1467003909585-2f8a72700288'),
  badge: {
    label: 'popular',
    tone: 'orange',
    icon: 'flame'
  }
}, {
  id: '2',
  title: 'creamy jerk pasta',
  prepper: 'island bites',
  rating: 4.9,
  reviews: 96,
  price: 13.49,
  time: '25–35 min',
  image: img('photo-1473093295043-cdd812d0e601'),
  badge: {
    label: 'new',
    tone: 'green',
    icon: 'sparkle'
  }
}, {
  id: '3',
  title: 'wellness bowl',
  prepper: 'green plates',
  rating: 4.7,
  reviews: 52,
  price: 12.49,
  time: '20–30 min',
  image: img('photo-1512621776951-a57141f2eefd'),
  badge: {
    label: 'healthy',
    tone: 'green',
    icon: 'leaf'
  }
}, {
  id: '4',
  title: 'jerk chicken bowl',
  prepper: 'spice haus',
  rating: 4.9,
  reviews: 74,
  price: 13.99,
  time: '20–30 min',
  image: img('photo-1546069901-ba9599a7e63c'),
  badge: {
    label: 'trending',
    tone: 'orange',
    icon: 'flame'
  }
}, {
  id: '5',
  title: 'butter chicken rice',
  prepper: 'masala house',
  rating: 4.6,
  reviews: 41,
  price: 11.99,
  time: '25–35 min',
  image: img('photo-1585937421612-70a008356fbe'),
  badge: null
}, {
  id: '6',
  title: 'mediterranean plate',
  prepper: 'olive & co',
  rating: 4.7,
  reviews: 63,
  price: 13.25,
  time: '20–30 min',
  image: img('photo-1540189549336-e6e99c3679fe'),
  badge: {
    label: 'fresh',
    tone: 'green',
    icon: 'leaf'
  }
}];

// Popular-right-now ordering for explore (with explore-style badges)
const POPULAR = [{
  ...MEALS[0],
  title: 'honey garlic salmon bowl',
  prepper: 'chef kelsey',
  badge: {
    label: 'trending',
    tone: 'orange',
    icon: 'flame'
  }
}, {
  ...MEALS[1],
  badge: {
    label: 'popular',
    tone: 'purple',
    icon: 'sparkle'
  }
}, {
  ...MEALS[3],
  badge: {
    label: 'fast selling',
    tone: 'orange',
    icon: 'bolt'
  }
}, {
  ...MEALS[2],
  title: 'vegan buddha bowl',
  badge: {
    label: 'new',
    tone: 'green',
    icon: 'sparkle'
  }
}];

// ── Preppers ─────────────────────────────────────────────────
const fimg = id => img(id, 120);
const PREPPERS = [{
  id: 'p1',
  name: 'Chef Kelsey',
  verified: true,
  rating: 4.9,
  reviews: 128,
  location: 'Harlem, NY',
  options: 'delivers · pickup',
  from: 12,
  fromTone: 'green',
  image: img('photo-1583394293214-28a5b0f5a5b8'),
  badge: {
    label: 'top rated',
    tone: 'green',
    icon: 'trophy'
  },
  thumbs: [fimg('photo-1546069901-ba9599a7e63c'), fimg('photo-1512621776951-a57141f2eefd'), fimg('photo-1585937421612-70a008356fbe')]
}, {
  id: 'p2',
  name: 'Island Bites',
  verified: true,
  rating: 4.8,
  reviews: 96,
  location: 'Queens, NY',
  options: 'delivers · cook at home',
  from: 10,
  fromTone: 'purple',
  image: img('photo-1577219491135-ce391730fb2c'),
  badge: {
    label: 'fast responder',
    tone: 'purple',
    icon: 'bolt'
  },
  thumbs: [fimg('photo-1473093295043-cdd812d0e601'), fimg('photo-1467003909585-2f8a72700288'), fimg('photo-1546069901-ba9599a7e63c')]
}, {
  id: 'p3',
  name: 'Spice Haus',
  verified: true,
  rating: 4.9,
  reviews: 74,
  location: 'Brooklyn, NY',
  options: 'delivers · pickup',
  from: 11,
  fromTone: 'orange',
  image: img('photo-1607631568010-a87245c0daf8'),
  badge: {
    label: 'new',
    tone: 'orange',
    icon: 'sparkle'
  },
  thumbs: [fimg('photo-1585937421612-70a008356fbe'), fimg('photo-1540189549336-e6e99c3679fe'), fimg('photo-1512621776951-a57141f2eefd')]
}, {
  id: 'p4',
  name: 'Nourish',
  verified: true,
  rating: 4.8,
  reviews: 58,
  location: 'Bronx, NY',
  options: 'delivers',
  from: 13,
  fromTone: 'green',
  image: img('photo-1595152772835-219674b2a8a6'),
  badge: {
    label: 'top rated',
    tone: 'green',
    icon: 'trophy'
  },
  thumbs: [fimg('photo-1512621776951-a57141f2eefd'), fimg('photo-1540189549336-e6e99c3679fe'), fimg('photo-1473093295043-cdd812d0e601')]
}];

// ── Cuisines ─────────────────────────────────────────────────
const CUISINES = [{
  name: 'italian',
  count: 128,
  img: 'photo-1473093295043-cdd812d0e601'
}, {
  name: 'mexican',
  count: 156,
  img: 'photo-1565299624946-b28f40a0ae38'
}, {
  name: 'asian',
  count: 142,
  img: 'photo-1512058564366-18510be2db19'
}, {
  name: 'mediterranean',
  count: 98,
  img: 'photo-1540189549336-e6e99c3679fe'
}, {
  name: 'indian',
  count: 87,
  img: 'photo-1585937421612-70a008356fbe'
}];

// ── Categories ───────────────────────────────────────────────
const CATEGORIES_HOME = [{
  key: 'breakfast',
  label: 'breakfast',
  icon: 'sun'
}, {
  key: 'lunch',
  label: 'lunch',
  icon: 'bowl'
}, {
  key: 'dinner',
  label: 'dinner',
  icon: 'cloche'
}, {
  key: 'healthy',
  label: 'healthy',
  icon: 'leaf'
}, {
  key: 'vegan',
  label: 'vegan',
  icon: 'sprout'
}, {
  key: 'more',
  label: 'more',
  icon: 'more'
}];
const CATEGORIES_EXPLORE = [{
  key: 'all',
  label: 'all',
  icon: 'grid'
}, {
  key: 'breakfast',
  label: 'breakfast',
  icon: 'sun'
}, {
  key: 'lunch',
  label: 'lunch',
  icon: 'bowl'
}, {
  key: 'dinner',
  label: 'dinner',
  icon: 'cloche'
}, {
  key: 'snacks',
  label: 'snacks',
  icon: 'cookie'
}, {
  key: 'desserts',
  label: 'desserts',
  icon: 'cake'
}, {
  key: 'more',
  label: 'more',
  icon: 'more'
}];

// ── Profile data ─────────────────────────────────────────────
const PROFILE = {
  name: 'alex morgan',
  tagline: 'good food. good mood. always.',
  location: 'New York, NY',
  avatar: img('photo-1544005313-94ddf0286df2', 200),
  balance: 1250,
  rewards: 12.50,
  tier: 'gold chef',
  toGo: 750,
  progress: 0.62,
  tags: [{
    label: 'foodie',
    icon: 'sun',
    color: YELLOW
  }, {
    label: 'explorer',
    icon: 'compass',
    color: PURPLE
  }, {
    label: 'plan lover',
    icon: 'heartSolid',
    color: PINK
  }],
  quicklinks: [{
    label: 'favorites',
    sub: '24 meals',
    icon: 'heartSolid',
    tint: '#FCE7F0',
    color: PINK
  }, {
    label: 'saved',
    sub: '18 items',
    icon: 'bookmark',
    tint: '#FDEDE4',
    color: ORANGE
  }, {
    label: 'recently viewed',
    sub: '32 meals',
    icon: 'clock',
    tint: '#E7F6EC',
    color: SUCCESS
  }, {
    label: 'following',
    sub: '12 preppers',
    icon: 'chefhat',
    tint: '#EDE9FE',
    color: PURPLE
  }, {
    label: 'referrals',
    sub: 'invite friends',
    icon: 'ticket',
    tint: '#FEF3C7',
    color: YELLOW
  }],
  hub: [{
    label: 'addresses',
    sub: '2 saved addresses',
    icon: 'pin'
  }, {
    label: 'payment methods',
    sub: 'Visa •••• 4242',
    icon: 'card'
  }, {
    label: 'notifications',
    sub: 'email, sms, push',
    icon: 'bell',
    dot: true
  }, {
    label: 'help center',
    sub: 'faq & support',
    icon: 'help'
  }, {
    label: 'dietary preferences',
    sub: 'manage your preferences',
    icon: 'leaf'
  }, {
    label: 'become a prepper',
    sub: 'share your kitchen',
    icon: 'chefhat',
    accent: true
  }, {
    label: 'invite friends',
    sub: 'earn rewards together',
    icon: 'gift'
  }, {
    label: 'dark mode',
    sub: 'off',
    icon: 'moon',
    toggle: true
  }]
};
const PLAN = {
  title: 'weekly wellness plan',
  by: "kelsey's kitchen",
  status: 'active',
  next: 'next delivery: may 12',
  summary: '4 meals · 2 snacks · weekly',
  image: img('photo-1490645935967-10de6ba17061'),
  members: [img('photo-1544005313-94ddf0286df2', 80), img('photo-1500648767791-00dcc994a43e', 80), img('photo-1438761681033-6461ffad8d80', 80)]
};
const RECENT_ORDERS = [{
  id: 'r1',
  title: 'jerk salmon bowl',
  by: 'spice haus',
  status: 'delivered',
  tone: 'green',
  date: 'may 8',
  price: 14.99,
  image: img('photo-1467003909585-2f8a72700288', 200)
}, {
  id: 'r2',
  title: 'creamy jerk pasta',
  by: 'island bites',
  status: 'preparing',
  tone: 'orange',
  date: 'may 10',
  price: 13.49,
  image: img('photo-1473093295043-cdd812d0e601', 200)
}, {
  id: 'r3',
  title: 'wellness bowl',
  by: 'green plates',
  status: 'delivered',
  tone: 'green',
  date: 'may 5',
  price: 12.49,
  image: img('photo-1512621776951-a57141f2eefd', 200)
}];

// ── Expose globally ──────────────────────────────────────────
Object.assign(window, {
  PREPPA_DATA: {
    MEALS,
    POPULAR,
    PREPPERS,
    CUISINES,
    CATEGORIES_HOME,
    CATEGORIES_EXPLORE,
    PROFILE,
    PLAN,
    RECENT_ORDERS,
    img
  },
  PREPPA_THEME: {
    ORANGE,
    ORANGE_DK,
    INK,
    MUTED,
    SECONDARY,
    CANVAS,
    SURFACE,
    BRAND_TINT,
    PEACH,
    PEACH_2,
    BORDER,
    SUCCESS,
    MINT,
    PURPLE,
    PINK,
    YELLOW,
    BLUE,
    FONT_DISPLAY,
    FONT_BODY
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/consumer/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/consumer/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.MealCard = __ds_scope.MealCard;

__ds_ns.PrepperCard = __ds_scope.PrepperCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Tag = __ds_scope.Tag;

})();
