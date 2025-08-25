import LogoLoop from '../../ReactBits/LogoLoop/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiReactrouter, SiClerk, SiAxios, SiNodedotjs, SiNodemon, SiExpress, SiThemoviedatabase, SiPostgresql } from 'react-icons/si';
import { useDarkMode } from '../context/DarkModeContext';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiReactrouter />, title: "React Router", href: "https://reactrouter.com" },
  { node: <SiClerk />, title: "Clerk", href: "https://clerk.com" },
  { node: <SiAxios />, title: "Axios", href: "https://axios-http.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress />, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
];
const techLogosDark = [
  { node: <SiReact className='text-primary'/>, title: "React", href: "https://react.dev" },
  { node: <SiVite className='text-primary'/>, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiTailwindcss className='text-primary'/>, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiReactrouter className='text-primary'/>, title: "React Router", href: "https://reactrouter.com" },
  { node: <SiClerk className='text-primary'/>, title: "Clerk", href: "https://clerk.com" },
  { node: <SiAxios className='text-primary'/>, title: "Axios", href: "https://axios-http.com" },
  { node: <SiNodedotjs className='text-primary'/>, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiExpress className='text-primary'/>, title: "Express.js", href: "https://expressjs.com" },
  { node: <SiPostgresql className='text-primary'/>, title: "PostgreSQL", href: "https://www.postgresql.org" },
];

function Loop() {
  const {darkMode} = useDarkMode();
  return (
    <div className='transition-all duration-300 mt-20 mx-auto' style={{ height: '200px', position: 'relative', overflow: 'hidden', width: '1000px'}}>
      {darkMode?
        <LogoLoop
        logos={techLogosDark}
        speed={30}
        direction="left"
        logoHeight={35}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#030712"
        ariaLabel="Technology used"
      />
      :
      <LogoLoop
        logos={techLogos}
        speed={30}
        direction="left"
        logoHeight={35}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology used"
      />
      }
      
    </div>
  );
}

export default Loop;