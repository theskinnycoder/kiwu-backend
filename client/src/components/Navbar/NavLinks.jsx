import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../utils/axiosHelper.js";

const renderLinks = (link, idx) => {
  if (link.path && link.children)
    return (
      <>
        <NavLink key={idx} to={link.path}>
          {link.name}
        </NavLink>
        <div>
          {link.children.map((child, index) => (
            <NavLink key={index} to={child.path}>
              {child.name}
            </NavLink>
          ))}
        </div>
      </>
    );
  else if (!link.path && link.categories)
    return (
      <>
        <span to={idx}>{link.name}</span>
        <div>
          {link.categories.map((category, index) => (
            <NavLink key={index} to={category.path}>
              {category.name}
            </NavLink>
          ))}
        </div>
      </>
    );
  else
    return (
      <NavLink key={idx} to={link.path}>
        {link.name}
      </NavLink>
    );
};

const NavLinks = () => {
  const [navLinks, setNavLinks] = useState([
    {
      name: "Men",
      categories: [],
    },
    {
      name: "Women",
      categories: [],
    },
    {
      name: "What's New",
      path: "/whats-new",
    },
    {
      name: "Designers",
      path: "/designers",
      children: [],
    },
  ]);

  useEffect(() => {
    (async () => {
      const designers = (await axios("/admins")).data;
      const menCategories = (await axios("/products/men/categories")).data;
      const womenCategories = (await axios("/products/women/ categories")).data;
      setNavLinks(links =>
        links.map(link => {
          if (link.name === "Designers") link.children = designers;
          else if (link.name === "Men") link.categories = menCategories;
          else if (link.name === "Women") link.categories = womenCategories;
          return link;
        }),
      );
    })();
  }, []);

  return <>{navLinks.map((link, idx) => renderLinks(link, idx))}</>;
};

export default NavLinks;
