import React, { useState } from "react";
import { AppBar, Tab } from "@material-ui/core";
import { useTabStyles } from "../tabs/styles/tabStyles";
import { TabContext, TabPanel, TabList } from "@material-ui/lab";

import SeeAllTimeSheets from "../admin/SeeAllTimeSheets";
import AdminPendingTimeSheets from "./AdminPendingTimeSheets";
import AdminAcceptedTimeSheets from "./AdminAcceptedTimeSheets";
import AdminRejectedTimeSheets from "./AdminRejectedTimeSheets";
const AdminTimeSheet = () => {
  const [value, setValue] = useState("1");
  const styles = useTabStyles();

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.root}>
      <TabContext value={value}>
        <AppBar className={styles.appBar} position="static">
          <TabList
            textColor="primary"
            indicatorColor="primary"
            value={value}
            onChange={handleTabChange}
          >
            <Tab value="1" label="View Pending" />
            <Tab value="2" label="View All" />
            <Tab value="3" label="View Rejected" />
            <Tab value="4" label="View Accepted" />
          </TabList>
        </AppBar>

        <TabPanel value="1">
          <AdminPendingTimeSheets />

          {/* <AddTimeSheetStudent /> */}
        </TabPanel>
        <TabPanel value="2">
          <SeeAllTimeSheets />
        </TabPanel>
        <TabPanel value="3">
          <AdminRejectedTimeSheets />
        </TabPanel>
        <TabPanel value="4">
          <AdminAcceptedTimeSheets />
        </TabPanel>
      </TabContext>
    </div>
  );
};

export { AdminTimeSheet };
