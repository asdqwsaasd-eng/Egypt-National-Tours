# Egypt National Tours --- Brand & UI Design System

## 1. Design Objective

The visual identity of the website should communicate:

-   Egyptian tourism
-   Trust and experience
-   Professional travel consultancy
-   Elegance
-   Simplicity
-   Warmth
-   Fast and easy interaction

The design direction is:

> **Elegant Egyptian Tourism --- Luxury without excess.**

The website must NOT look overly corporate, overly colorful, childish,
or overloaded with animations.

It should feel premium while remaining approachable to Egyptian and
international customers.

------------------------------------------------------------------------

# 2. Existing Brand Identity

Company:

**Egypt National Tours**

Arabic brand name:

**إيجيبت ناشيونال تورز**

Tagline:

**Discover the Charm of Egypt**

Company statement:

**Licensed since 1990 in Egypt & USA**

The supplied company logo is the primary brand asset.

Do not redraw, distort, recolor, stretch, or modify the supplied logo
unless a separate approved logo variant is provided.

The logo should preserve its proportions.

------------------------------------------------------------------------

# 3. Visual Inspiration

The visual language should be inspired by the existing logo:

-   Egyptian red
-   Warm golden yellow
-   White/light backgrounds
-   Subtle sand/beige tones
-   Very dark neutral text

The website should not simply copy the logo colors everywhere.

Use the stronger colors as accents.

Most of the interface should remain light and clean.

------------------------------------------------------------------------

# 4. Color System

Use CSS variables so colors can be changed centrally.

Recommended initial palette:

``` css
--brand-red: #C91F2E;
--brand-red-dark: #A91522;
--brand-gold: #F4C400;
--brand-gold-light: #FFF3B0;

--sand: #F7F1E5;
--cream: #FCFAF5;

--text-primary: #222222;
--text-secondary: #626262;
--text-muted: #858585;

--white: #FFFFFF;
--border: #E8E8E8;

--success: #2E7D32;
--error: #C62828;
--info: #1565C0;
```

These are starting values, not a requirement to reproduce the logo
pixels exactly.

The implementation should keep all colors centralized in the design
system so the palette can be adjusted later without editing individual
components.

------------------------------------------------------------------------

# 5. Color Usage Rules

## Primary

Brand red is the primary action/identity color.

Use it for:

-   Primary buttons
-   Important headings/accent lines
-   Selected navigation states
-   Key brand elements

Do NOT use large solid red backgrounds everywhere.

------------------------------------------------------------------------

## Secondary

Gold/yellow is the secondary accent.

Use it for:

-   Small highlights
-   Icons
-   Decorative lines
-   Active details
-   Small badges
-   Hover accents

Avoid using bright yellow for long paragraphs or large text.

------------------------------------------------------------------------

## Background

The majority of pages should use:

-   White
-   Very light cream
-   Very light sand

Large sections should feel airy.

------------------------------------------------------------------------

# 6. Typography

The website must support Arabic and English professionally.

## Arabic

Preferred font direction:

**Cairo** or **Tajawal**

Recommended default:

**Cairo**

Use appropriate font weights:

-   400 --- body
-   500 --- labels
-   600 --- navigation/subheadings
-   700 --- main headings

Avoid decorative Arabic fonts.

------------------------------------------------------------------------

## English

Preferred:

**Inter**

Alternative:

**Poppins**

Recommended default:

**Inter**

Use:

-   400 --- body
-   500 --- labels
-   600 --- navigation/subheadings
-   700 --- headings

------------------------------------------------------------------------

# 7. Typography Scale

Desktop starting scale:

``` text
Hero title:       48–60px
Page title:       40–48px
Section title:    30–36px
Card title:       20–24px
Body:             16–18px
Small text:       13–14px
Button:           15–16px
```

Mobile:

``` text
Hero title:       32–38px
Page title:       30–34px
Section title:    24–28px
Card title:       18–21px
Body:             15–17px
```

Do not make every heading huge.

------------------------------------------------------------------------

# 8. Layout Width

Use a centered content container.

Recommended:

``` text
max-width: 1200–1280px
```

The site should have comfortable side spacing on desktop and mobile.

Avoid full-width text blocks that become difficult to read.

------------------------------------------------------------------------

# 9. Header

## Desktop

Header structure:

``` text
[Logo]  Home  Services  Egypt Tours  Hajj & Umrah  International Tours  About & Contact  Language  [Request Your Trip]
```

The header should be:

-   Clean
-   White/light
-   Sticky or intelligently fixed if performance remains good
-   Compact
-   Easy to scan

The logo should have enough breathing room.

------------------------------------------------------------------------

# 10. Header Behavior

At the top of the homepage, the header may initially be
transparent/overlayed only if the hero image remains readable.

Otherwise use a solid light header.

When scrolling:

-   Maintain readable background
-   Add subtle shadow/border
-   Do not create a dramatic animation

Navigation hover:

-   Subtle brand-red or gold accent
-   No large movement

------------------------------------------------------------------------

# 11. Mobile Header

Mobile header:

``` text
[Logo]                         [Menu]
```

Inside menu:

-   Home
-   Services
-   Egypt Tours
-   Hajj & Umrah
-   International Tours
-   About & Contact
-   Language
-   Request Your Trip

WhatsApp should remain accessible through a floating button.

------------------------------------------------------------------------

# 12. Hero Section

The homepage hero is the most important visual area.

Recommended composition:

``` text
------------------------------------------------
| Header                                        |
|                                                |
| Discover the Charm of Egypt                  |
| Professional travel services since 1990      |
|                                                |
| [Request Your Trip] [Chat on WhatsApp]       |
|                                                |
|                             Egyptian image    |
------------------------------------------------
```

Use a high-quality Egyptian tourism image.

Possible subjects:

-   Pyramids
-   Nile
-   Ancient temples
-   Cairo skyline
-   Luxor/Aswan
-   Egyptian cultural scene

Avoid generic stock images that do not feel Egyptian.

------------------------------------------------------------------------

# 13. Hero Text

Arabic example:

**اكتشف سحر مصر**

Supporting:

**خبرة في خدمات السياحة والسفر منذ عام 1990**

English:

**Discover the Charm of Egypt**

Supporting:

**Professional tourism and travel services since 1990**

Do not overload the hero with paragraphs.

------------------------------------------------------------------------

# 14. Hero CTA

Primary:

Arabic:

**اطلب رحلتك الآن**

English:

**Request Your Trip**

Secondary:

Arabic:

**تواصل معنا عبر واتساب**

English:

**Chat on WhatsApp**

WhatsApp button should open:

`https://wa.me/201063314240`

Do not use a fake or placeholder WhatsApp link in production.

------------------------------------------------------------------------

# 15. Service Cards

Service cards should be elegant and simple.

Recommended:

-   White background
-   Thin border
-   Very subtle shadow
-   Rounded corners
-   Simple line/icon illustration
-   Short title
-   One-sentence description
-   Small CTA

Do not use excessive 3D effects.

------------------------------------------------------------------------

# 16. Service Categories

Recommended visual grouping:

### Travel & Booking

-   Flight Tickets
-   Hotel Reservations

### Egypt & International Travel

-   Egypt Tours
-   International Tours
-   Custom Tours

### Visas & Entry

-   Visa Services
-   Security Approvals

### Religious Travel

-   Hajj
-   Umrah

### Ground Services

-   Tourist Transportation

This grouping makes the services easier to understand.

------------------------------------------------------------------------

# 17. Cards

General card rules:

``` text
Border radius: 12–18px
Border: subtle
Shadow: very light
Padding: 20–28px
```

Cards should have consistent height where practical.

Image cards should use consistent aspect ratios.

Do not stretch images.

Use `object-fit: cover` where appropriate.

------------------------------------------------------------------------

# 18. Egypt Tour Cards

Each tour card should show:

-   Image
-   Tour name
-   Duration
-   Destinations
-   Short summary
-   View Details
-   Request This Tour

Do not show a fake price.

If no price is provided by CMS, do not render a price placeholder such
as "\$0" or "Contact for price" unless that exact wording is
intentionally configured.

------------------------------------------------------------------------

# 19. Tour Detail Pages

Recommended visual order:

``` text
Hero image
↓
Tour title + duration
↓
Overview
↓
Itinerary
↓
Included / Not Included
↓
Important information
↓
Gallery
↓
Request This Tour
```

The Request button should remain visually easy to find.

On mobile, consider a sticky bottom CTA only if it does not obstruct
content.

------------------------------------------------------------------------

# 20. Hajj & Umrah Design

Keep this section respectful and professional.

Do not use flashy tourism animations.

The current package/program can be presented as a strong visual card.

The company can replace the package image/content through CMS.

------------------------------------------------------------------------

# 21. Forms

Forms are a major part of this website.

They must look trustworthy and easy to complete.

General style:

-   White cards
-   Light border
-   Clear labels
-   Large touch-friendly inputs
-   Clear required-field indicators
-   Helpful placeholders
-   Consistent spacing

Do not make forms visually crowded.

------------------------------------------------------------------------

# 22. Form Layout

Desktop:

Use two-column layout where appropriate.

Example:

``` text
First Name              Last Name
Phone                   Email
Country                 Service
Date                    Number of Travelers
Notes
                 [Submit Request]
```

Mobile:

Everything becomes one column.

------------------------------------------------------------------------

# 23. Form Inputs

Recommended:

``` text
Height: 46–52px
Radius: 8–12px
Padding: 12–16px
```

Textarea:

``` text
Minimum height: 120px
```

Focus state:

-   Brand-red or brand-gold border
-   Subtle focus ring

Do not use extremely bright focus effects.

------------------------------------------------------------------------

# 24. Buttons

Primary button:

-   Brand red background
-   White text
-   Rounded
-   Medium/bold weight

Secondary button:

-   White/light background
-   Brand red border/text

WhatsApp:

-   Use the recognizable WhatsApp icon/color where appropriate

Buttons should have a subtle hover transition.

Avoid bouncing, glowing, or exaggerated button animations.

------------------------------------------------------------------------

# 25. Success Message

After submission:

Show an attractive but simple success state.

Arabic:

**تم إرسال طلبكم بنجاح**

**رقم الطلب: ENT-2026-000001**

**سيتواصل معكم أحد مستشاري Egypt National Tours قريبًا.**

English:

**Your request has been submitted successfully.**

**Request Reference: ENT-2026-000001**

**One of our travel consultants will contact you shortly.**

Buttons:

-   WhatsApp
-   Back to Home

Do not show raw technical errors to customers.

------------------------------------------------------------------------

# 26. Error Handling

Validation errors should appear next to the relevant field.

Example Arabic:

**يرجى إدخال رقم الهاتف.**

English:

**Please enter your phone number.**

Use clear language.

Do not clear all user-entered data when one field fails validation.

------------------------------------------------------------------------

# 27. WhatsApp Floating Button

Place a floating WhatsApp button on public pages.

Requirements:

-   Fixed position
-   Mobile friendly
-   Does not cover important controls
-   Accessible label
-   Opens WhatsApp directly

Suggested mobile placement:

Bottom-right for LTR.

For Arabic RTL, placement may remain visually consistent or move to the
opposite side depending on the overall design.

The implementation should avoid covering cookie notices, sticky CTAs, or
form controls.

------------------------------------------------------------------------

# 28. Contact Icons

Use compact icons for:

-   WhatsApp
-   Phone
-   Email
-   Facebook
-   Location
-   Working hours

Do not display enormous social-media blocks.

------------------------------------------------------------------------

# 29. Reviews Section

Reviews will be CMS-managed.

Homepage:

Show a small selection of reviews.

Dedicated reviews page is NOT required initially.

Review cards can contain:

-   Customer name
-   Country if approved
-   Rating
-   Review text
-   Optional date

Do not invent real customer reviews in production.

Placeholder/demo reviews may exist during development but must be
clearly marked as demo content and must be easy to replace/remove.

------------------------------------------------------------------------

# 30. Images

Image rules:

-   Use high-quality images
-   Compress images
-   Use modern formats where supported
-   Provide responsive image sizes
-   Use lazy loading below the fold
-   Always provide meaningful alt text
-   Avoid loading huge original photos when a smaller version is
    sufficient

Hero images should be optimized because they have a major impact on page
speed.

------------------------------------------------------------------------

# 31. Image Style

Preferred:

-   Authentic Egypt
-   Natural lighting
-   Premium travel feel
-   Clean composition
-   Human/experiential images when appropriate

Avoid:

-   Overly saturated colors
-   Fake-looking AI tourism images
-   Generic hotel stock photos unrelated to the destination
-   Excessive text over photos

------------------------------------------------------------------------

# 32. Decorative Elements

Use subtle Egyptian-inspired details.

Examples:

-   Very thin geometric patterns
-   Gold divider lines
-   Minimal pyramid-inspired shapes
-   Subtle sand textures

Do not turn the interface into an Egyptian-themed game or museum
website.

The brand should remain modern.

------------------------------------------------------------------------

# 33. Animation

Animation philosophy:

**Fast, subtle, purposeful.**

Allowed:

-   Fade in
-   Small slide
-   Button hover
-   Card hover
-   Mobile menu transition
-   Smooth anchor scrolling

Avoid:

-   Large parallax effects
-   Constant floating objects
-   Spinning icons
-   Excessive page transitions
-   Heavy animation libraries unless necessary

Respect:

`prefers-reduced-motion`

------------------------------------------------------------------------

# 34. Shadows

Use soft shadows.

Example direction:

``` text
0 4px 20px rgba(0,0,0,0.06)
```

Do not use heavy black shadows.

------------------------------------------------------------------------

# 35. Border Radius

Recommended:

-   Buttons: 8--12px
-   Inputs: 8--12px
-   Cards: 12--18px
-   Large image containers: 16--24px

Keep radius consistent.

------------------------------------------------------------------------

# 36. RTL / LTR

Arabic:

`dir="rtl"`

English:

`dir="ltr"`

The layout must not simply mirror text.

Check:

-   Navigation
-   Forms
-   Icons
-   Breadcrumbs
-   Cards
-   Buttons
-   Arrow icons
-   Carousels
-   Footer
-   Mobile menu

Directional icons should visually adapt when appropriate.

------------------------------------------------------------------------

# 37. Language Switcher

Display:

**العربية \| English**

The switcher should take the user to the equivalent page in the other
language whenever the translated page exists.

Example:

Arabic:

`/ar/egypt-tours/cairo/`

English:

`/en/egypt-tours/cairo/`

Do not send users to the homepage unnecessarily when an equivalent
translation exists.

------------------------------------------------------------------------

# 38. Responsive Breakpoints

The site must be designed mobile-first.

Recommended conceptual breakpoints:

``` text
Mobile:  < 640px
Tablet:  640–1023px
Desktop: 1024px+
Large:   1280px+
```

The exact CSS breakpoints can be adjusted by the implementation
framework.

Test at:

-   Small mobile
-   Large mobile
-   Tablet portrait
-   Tablet landscape
-   Laptop
-   Desktop
-   Large desktop

------------------------------------------------------------------------

# 39. Accessibility

Minimum requirements:

-   Semantic HTML
-   Keyboard navigation
-   Visible focus states
-   Proper labels
-   Alt text
-   Good color contrast
-   Accessible buttons
-   Accessible form errors
-   Screen-reader-friendly navigation
-   No interaction dependent only on hover

The website should aim for WCAG 2.1 AA principles where practical.

------------------------------------------------------------------------

# 40. Performance Rules

Visual design must not compromise speed.

Avoid:

-   Huge background videos
-   Autoplay video
-   Heavy sliders
-   Excessive web fonts
-   Unnecessary icon libraries
-   Large JavaScript animation frameworks

Prefer:

-   CSS
-   SVG icons
-   Optimized WebP/AVIF images
-   Lazy loading
-   Code splitting where supported

------------------------------------------------------------------------

# 41. Footer

Footer should be visually lighter than the hero.

Include:

-   Logo
-   Short company statement
-   Services links
-   Travel links
-   Contact information
-   Social links
-   Copyright

Keep it compact.

------------------------------------------------------------------------

# 42. Overall Visual Hierarchy

Every page should follow:

``` text
Clear title
↓
Short explanation
↓
Visual/content
↓
Action
```

The visitor should always know what to do next.

------------------------------------------------------------------------

# 43. What Antigravity Must Avoid

The AI implementation must NOT:

-   Invent a new logo
-   Change company colors without approval
-   Add excessive gradients
-   Use dark luxury themes by default
-   Overuse glassmorphism
-   Overuse animations
-   Fill the site with stock images
-   Add unnecessary popups
-   Add fake reviews
-   Add fake prices
-   Add fake booking availability
-   Claim live flight/hotel inventory without API integration
-   Add unnecessary pages
-   Create an overly complicated header
-   Make the forms intimidating
-   Hide the main CTA
-   Use poor Arabic typography
-   Break RTL layout
-   Translate company names incorrectly

------------------------------------------------------------------------

# 44. Design Tokens

Implementation should centralize the following:

``` text
Colors
Typography
Spacing
Border radius
Shadows
Container widths
Button sizes
Input heights
Breakpoints
Transitions
```

This allows the site to be redesigned later without rebuilding
components.

------------------------------------------------------------------------

# 45. Component Philosophy

Build reusable components.

Examples:

``` text
Header
Footer
Button
SectionHeader
ServiceCard
TourCard
ReviewCard
FormField
SelectField
DateField
RequestForm
WhatsAppButton
LanguageSwitcher
Breadcrumbs
Modal
Toast/SuccessMessage
```

Do not duplicate the same UI in multiple pages.

------------------------------------------------------------------------

# 46. Final Design Direction

The final website should feel like:

> A trusted Egyptian travel company with decades of experience,
> presented through a modern, elegant, lightweight digital experience.

Not:

> A generic AI-generated travel template.

The brand logo, Egyptian visual identity, clear content, strong
photography, excellent Arabic typography, and simple request process
should define the experience.
