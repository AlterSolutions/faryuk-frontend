import * as React from "react";

// Router imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// @mui imports
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from "@mui/material/Grid";

// custom imports
import { routes, IRoute } from "./routes";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/atomic/navbar";
import ProtectedRoute from "./components/atomic/protectedRoute";
import Sidebar from "./components/atomic/sidebar";
import UserHandler from "./api/UserHandler";

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    UserHandler.isLoggedin()
    .then((data: any) => {
      if(data.status === "Success") {
        setMode(data.body.theme);
      }
    })
  });

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          UserHandler.defineTheme(prevMode === 'light' ? 'dark' : 'light')
          return (prevMode === 'light' ? 'dark' : 'light');
        });
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const { authed, loading, isAdmin } = useAuth();

  const renderSidebar = (
    <Grid container item xs={3}>
      <Grid item xs={12}>
        FaRyuk
      </Grid>
      <Grid item xs={12}>
        <Sidebar isAdmin={isAdmin} />
      </Grid>
    </Grid>
  );

  const renderNavbar = (
    <Grid item alignItems="right">
      <Navbar isAdmin={isAdmin} />
    </Grid>
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          { loading !== 2 ? (
          <div>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
          ) : (
          <BrowserRouter>
            <Routes>
              {routes.map((item: IRoute, index: number) => {
                return (
                  !item.authRequired ? <Route key="preauth-routes" element={<ProtectedRoute isAuthorized={!authed} fallback="/home" />}>
                    <Route key={item.key} path={item.path} element={item.component} />
                  </Route>
                    : null
                );
              })}
              <Route element={<ProtectedRoute isAuthorized={authed} fallback="/authentication" />}>
                {routes.map((item: IRoute, index: number) => {
                  return (
                    item.authRequired && !item.adminRequired ? 
                      <Route key={item.key} path={item.path} element={(
                        <Grid container spacing={2}>
                          {renderSidebar}
                          <Grid container direction="column" spacing={5} item xs={8}>
                            {renderNavbar}
                            <Grid item>
                              {item.component}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      /> : null
                  )
                })}
              </Route>
              <Route element={<ProtectedRoute isAuthorized={isAdmin} fallback="/home" />}>
                {routes.map((item: IRoute, index: number) => {
                  return (
                    item.adminRequired ?
                      <Route key={item.key} path={item.path} element={(
                        <Grid container spacing={2}>
                          {renderSidebar}
                          <Grid container direction="column" spacing={5} item xs={8}>
                            {renderNavbar}
                            <Grid item>
                              {item.component}
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                      /> : null
                  )
                })}
              </Route>
            </Routes>
          </BrowserRouter>
          )
          }
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
