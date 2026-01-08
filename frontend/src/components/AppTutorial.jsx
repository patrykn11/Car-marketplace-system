import { useEffect } from "react";
import { driver } from "driver.js";

const AppTutorial = () => {
  
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");

    if (!hasSeenTutorial) {
      const driverObj = driver({
        showProgress: true,
        animate: true,
        popoverClass: 'driverjs-theme',
        steps: [
          { 
            element: '#welcome-banner', 
            popover: { 
              title: 'Welcome to EITI MOTO!', 
              description: 'The best place to buy, sell, and value cars. Let\'s take a quick tour.', 
              side: "bottom", 
              align: 'center' 
            } 
          },
          { 
            element: '#most-popular-section', 
            popover: { 
              title: 'Trending Cars', 
              description: 'See what other users are looking at right now.', 
              side: "right", 
              align: 'start' 
            } 
          },
          { 
            element: '#for-you-section', 
            popover: { 
              title: 'Made For You', 
              description: 'Our AI analyzes your likes to suggest your dream car here.', 
              side: "left", 
              align: 'start' 
            } 
          },
          { 
            element: '#nav-browse', 
            popover: { 
              title: 'Browse All Cars', 
              description: 'Use advanced filters to find exactly what you need.', 
              side: "bottom", 
              align: 'center' 
            } 
          },
           { 
            element: '#nav-valuation', 
            popover: { 
              title: 'Car Valuation', 
              description: 'Not sure how much a car is worth? Check our valuation tool.', 
              side: "bottom", 
              align: 'center' 
            } 
          },
          { 
            element: '#nav-theme-toggle', 
            popover: { 
              title: 'Dark Mode', 
              description: 'Prefer a darker look? Switch the theme here anytime.', 
              side: "bottom", 
              align: 'center' 
            } 
          },
          
          ...(document.getElementById('nav-add-car') ? [{ 
            element: '#nav-add-car', 
            popover: { 
              title: 'Sell Your Car', 
              description: 'Ready to sell? Click here to create a new listing instantly.', 
              side: "bottom", 
              align: 'end' 
            } 
          }] : []),

          ...(document.getElementById('nav-register') ? [{ 
            element: '#nav-register', 
            popover: { 
              title: 'Join Us', 
              description: 'Create an account to save favorites and get AI recommendations!', 
              side: "bottom", 
              align: 'end' 
            } 
          }] : []),
        ],
        
        onDestroyStarted: () => {
          localStorage.setItem("hasSeenTutorial", "true");
          driverObj.destroy();
        },
      });

      setTimeout(() => {
        driverObj.drive();
      }, 1000);
    }
  }, []);

  return null;
};

export default AppTutorial;