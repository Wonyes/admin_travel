import { createGlobalStyle } from "styled-components";

const neoR = "/font/apple/AppleSDGothicNeoR.ttf";
const neoSB = "/font/apple/AppleSDGothicNeoSB.ttf";

const Global = createGlobalStyle`

@font-face {
  font-family: "neoSB";
  src: local("neoSB"), url(${neoSB}) format("opentype");
  font-display: swap;
}

@font-face {
  font-family: "neoR";
  src: local("neoR"), url(${neoR}) format("opentype");
  font-display: swap;
}

:root {
  /* font-style */
  --f-neoR: "neoR";
  --f-neoSB: "neoSB";

  --f-header: "neoSB";
  --f-title: "neoSB";
  --f-subTitle: "neoSB";
  --f-subB: "neoSB";

  
  --f-sub: "neoR";
  --f-text: "neoR";
  --f-subText: "neoR";
  --f-caption: "neoR";

  /* font-size */
  --s-text: 16px;
  --s-title: 16px;
  --s-header: 22px;

  --s-small : 12px;
  --s-sub: 14px;
  --s-caption: 12px;

  --s-title: 16px;
  --s-subTitle: 14px;
  --s-text: 16px;
  --s-subText: 14px;
  --s-caption: 12px;

  /* font-height */

  --l-header: 36px;
  --l-title: 24px;
  --l-subTitle: 22px;
  --l-text: 24px;
  --l-subText: 22px;
  --l-caption: 18px;
  --l-small: 18px;

  /* font-color / back-color */
  --c-black :#000;
  --c-white :#fff;
  --c-red: #e71616;
  --c-warning: rgba(231, 22, 22, 0.5);
  --c-blue : #2e81ff;

  --c-line : #aaa;
  --c-input : #eee;

  --c-bg : #333;
  --c-bg2 : #222;

  --c-subText1 : rgba(0,0,0,0.5);
  --c-subText2 : rgba(255,255,255,0.5);
  --c-subText3 : #444;

  --shadow: 0 0 7px 0 rgba(0, 0, 0, 0.30);
  --shadow2: 0 0 10px 0 rgba(0, 0, 0, 0.25);

  --dim : rgba(0,0,0,0.5);

}

* {
  color: var(--c-black);
  font-size: var(--s-sub);
  line-height: 22px;
  font-family:"neoSB","neoR", "sans-serif";
}


.morphism{
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 12px;
}


svg {
  cursor: pointer;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:disabled {
  cursor: default;
}


.scroll-lock {
  height: 100%;
  overflow-y: hidden !important;
  touch-action: none !important;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: none;
}

html {
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
  -ms-content-zooming: none;
  touch-action: pan-x pan-y;
  -ms-touch-action: pan-x pan-y;
}

html {
  overscroll-behavior: contain;
}

body::-webkit-scrollbar {
  width: 3px;
}

body::-webkit-scrollbar-track {
    background-color: gray;
}


body::-webkit-scrollbar-thumb {
  scroll-behavior: none;
  border : none;
  width: 2px;
  height: 10px;
  border-radius: 100px;
}

.editor-container {
  height: 400px;
  width: 100%;
}

body::-webkit-scrollbar-button {
  display: none;
}

body {
  -ms-overflow-style: none;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;

}

input[type="password"]::-webkit-password-view-button,
input[type="password"]::-ms-reveal {
  background-color: transparent;
  background-size: cover;
  width: 20px;
  height: 20px;
  cursor: pointer;
}


a {
  color: inherit;
  text-decoration: none;
}

li {
  list-style: none;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
time,
figure,
article,
nav,
header,
footer,
hgroup,
video,
audio,
aside,
blockquote,
neo,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
font,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  vertical-align: baseline;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

ol,
ul {
  list-style: none;
}

figure,
article,
header,
footer,
nav,
hgroup,
video,
audio,
aside,
main {
  display: block;
}

input,
textarea {
  -webkit-appearance: none;
  appearance: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}

html {
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  text-size-adjust: none;
}

body,
textarea:focus,
input:focus,
a:focus {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

body {
  -webkit-touch-callout: none;
  background-color: #eee;
}

::-moz-selection {
  background: #023586;
  background: rgba(2, 53, 134, 1);
  color: var(--c-white);
}

::selection {
  background: #023586;
  background: rgba(2, 53, 134, 1);
  color: var(--c-white);
}

label {
  cursor: pointer;
}

input,
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="text"],
input[type="tel"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="number"],
input[type="search"],
textarea {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
}

input[type="radio"],
input[type="checkbox"] {
  clip: rect(0, 0, 0, 0);
  border: 0;
  margin: 0;
}

button,
input[type="file"],
input[type="image"],
input[type="reset"],
input[type="button"],
input[type="submit"] {
  border: none;
  background: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  -o-border-radius: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

::-webkit-input-placeholder {
  color: #999;
}

::-moz-placeholder {
  color: #999;
}

:-ms-input-placeholder {
  color: #999;
}

input:focus::-webkit-input-placeholder,
textarea:focus::-webkit-input-placeholder {
  color: transparent;
}

input:focus::-moz-placeholder,
textarea:focus::-moz-placeholder {
  color: transparent;
}

input:focus:-ms-input-placeholder,
textarea:focus:-ms-input-placeholder {
  color: transparent;
}

input::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration {
  display: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

select {
  border: 1px solid #111;
  -webkit-appearance: none;
  /* FF */
  -moz-appearance: none;
  /* safari chrome */
  appearance: none;
}

select::-ms-expand {
  display: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
textarea:-webkit-autofill:active,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus,
select:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 60px var(--c-white) inset;
}

input:-webkit-autofill {
  -webkit-text-fill-color: #111;
}


`;

export default Global;
