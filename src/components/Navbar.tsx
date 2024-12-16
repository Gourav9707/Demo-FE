import Image from "next/image";
import { useRouter } from 'next/router'
import Link from "next/link";
import Box from "@/components/Box";
import Typography from "@/components/Typography";
import classNames from "classnames";
import getConfig from "@/utils/configHelper";
import styles from "@/styles/components/navbar.module.css";

const Navbar = () => {
  const { configData } = getConfig();
  const router = useRouter()

  return (
    <nav className={classNames(styles.root)}>
      <Box customStyle={{ [styles.flexBoxBtw]: true }}>
        <div className={classNames({ [styles.flexBox]: true })}>
          <Image
            src={"/assets/icons/coinclap.png"}
            height={36}
            width={36}
            alt="coinclap"
          />
          <Typography weight="font600">
            {configData.miscWord.project}
          </Typography>
        </div>
        <div
          className={classNames({
            [styles.flexBox]: true,
            [styles.gap4]: true,
            
          })}
        >
          {configData.navbarOptions.map((_el) => (
            <Link key={_el.id} className={classNames(styles.navBox, {
              [styles.active]: router?.pathname.includes(_el?.route)
            })} href={_el?.route as string}>
              <Typography>{_el?.label}</Typography>
            </Link>
          ))}
          <button>help</button>
        </div>
      </Box>
    </nav>
  );
};

export default Navbar;
