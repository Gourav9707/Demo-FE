import React, { PropsWithChildren, HTMLAttributes } from "react";
import Image from "next/image";
import Typography from "@/components/Typography";
import Box from "@/components/Box";
import classNames from "classnames";
import styles from "@/styles/components/footer.module.css";
import getConfig from "@/utils/configHelper";

interface Props extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  showFooter?: boolean;
}

const Footer: React.FC<Props> = ({ showFooter = true }) => {
  const { configData } = getConfig();

  return (
    <div
      className={classNames(styles.root, {
        [styles.hiddenDiv]: !showFooter,
      })}
    >
      <Box customStyle={{[styles.flexBoxBtw]: true}}>
        <div><Typography color="white">© 2024 Project, All right reserved</Typography></div>
        <div className={classNames(styles.flexBox, {[styles.gap4]: true})}>
          {configData.socialLink.map((_el) => (
            <a href={_el?.url} key={_el?.id} target="_blank">
              <Image src={_el?.img} height={28} width={28} alt={_el.id}/>
            </a>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Footer;
