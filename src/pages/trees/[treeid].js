/* eslint-disable @next/next/no-img-element */
import AccessTime from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import { useMediaQuery, useTheme, SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import log from 'loglevel';
import { useEffect } from 'react';
import CustomImageWrapper from 'components/common/CustomImageWrapper';
import { useDrawerContext } from 'context/DrawerContext';
import { getOrganizationById, getPlanterById, getTreeById } from 'models/api';
import { makeStyles } from 'models/makeStyles';
import InformationCard1 from '../../components/InformationCard1';
import VerifiedBadge from '../../components/VerifiedBadge';
import BackButton from '../../components/common/BackButton';
import TreeTag from '../../components/common/TreeTag';
import accuracyIcon from '../../images/icons/accuracy.svg';
import calendarIcon from '../../images/icons/calendar.svg';
import globalIcon from '../../images/icons/global.svg';
import historyIcon from '../../images/icons/history.svg';
import location from '../../images/icons/location.svg';
import tokenIcon from '../../images/icons/token.svg';
import searchIcon from '../../images/search.svg';
import { useMapContext } from '../../mapContext';

const useStyles = makeStyles()((theme) => ({
  imageContainer: {
    position: 'relative',
    flexGrow: 1,
    width: '100%',
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tabBox: {
    marginTop: theme.spacing(9),
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(5),
    },
    flexWrap: 'wrap',
    display: 'flex',
    gap: 16,
    // '& div': {
    //   margin: theme.spacing(2),
    //   [theme.breakpoints.down('md')]: {
    //     marginTop: theme.spacing(1),
    //   },
    // },
  },
}));

export default function Tree({
  tree,
  planter,
  organization,
  nextExtraIsEmbed,
  nextExtraKeyword,
}) {
  const { classes } = useStyles();
  const mapContext = useMapContext();
  const theme = useTheme();

  const { setTitlesData } = useDrawerContext();

  log.warn('map:', mapContext);

  useEffect(() => {
    setTitlesData({
      treeId: tree.id,
      verifiedToken: tree.token_id,
      verifiedTree: tree.verified,
    });
  }, [setTitlesData, tree.id, tree.token_id, tree.verified]);

  useEffect(() => {
    // manipulate the map
    if (mapContext.map && tree?.lat && tree?.lon) {
      mapContext.map.flyTo(tree.lat, tree.lon, 16);
    }
  }, [mapContext.map, tree.lat, tree.lon]);

  return (
    <Box
      sx={{
        padding: 6,
      }}
    >
      {/* <IsMobileScreen>
        <DrawerTitle />
      </IsMobileScreen> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <BackButton />
        <Box>
          { }
          <img src={searchIcon} alt="search" />
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: 4,
          maxHeight: 764,
          mt: 6,
          position: 'relative',
          overflow: 'hidden',
          '& img': {
            width: '100%',
          },
        }}
      >
        <img src={tree.image_url} alt="tree" />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            background:
              'linear-gradient(359.38deg, #222629 0.49%, rgba(34, 38, 41, 0.8) 37.89%, rgba(34, 38, 41, 0.7) 50.17%, rgba(34, 38, 41, 0.6) 58.09%, rgba(34, 38, 41, 0.2) 82.64%, rgba(34, 38, 41, 0.05) 92.94%, rgba(34, 38, 41, 0) 99.42%)',
            p: 6,
            width: 1,
            height: 260,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h2" color={theme.palette.common.white}>
            Tree - #{tree.id}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
            }}
            variant="h5"
            color={theme.palette.common.white}
          >
            Palm tree
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
            }}
          >
            <VerifiedBadge
              color="primary"
              verified
              badgeName="Verified Planter"
            />
            <VerifiedBadge color="secondary" badgeName="Token Issued" />
          </Box>
        </Box>
      </Box>
      {/* <CustomImageWrapper
        imageUrl={tree.image_url}
        timeCreated={tree.time_created}
        treeId={tree.id}
      /> */}
      {organization && (
        <Box
          sx={{
            mt: 14,
          }}
        >
          <InformationCard1
            entityName={organization.name}
            entityType="Planting Organization"
            buttonText="Meet the Organization"
            cardImageSrc={organization?.photo_url}
            link={`/organizations/${organization.id}?embed=${nextExtraIsEmbed}&keyword=${nextExtraKeyword}`}
          />
        </Box>
      )}
      <Box
        sx={{
          mt: 10,
        }}
      >
        <InformationCard1
          entityName={`${planter.first_name} ${planter.last_name}`}
          entityType="Planter"
          buttonText="Meet the Planter"
          cardImageSrc={planter?.image_url}
          link={`/planters/${planter.id}?embed=${nextExtraIsEmbed}&keyword=${nextExtraKeyword}`}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontSize: [24, 28],
          lineHeight: (t) => [t.spacing(7.25), t.spacing(8.5)],
          mt: (t) => [t.spacing(14), t.spacing(26)],
        }}
      >
        Tree Info
      </Typography>
      <Box className={classes.tabBox}>
        <TreeTag
          TreeTagValue={new Date(tree.time_created).toLocaleDateString()}
          title="Planted on"
          icon={<img src={calendarIcon} alt="calendar" />}
        />
        <TreeTag
          TreeTagValue="Tanzania"
          title="Located in"
          icon={<img src={location} alt="location" />}
        />
        {tree.age && (
          <TreeTag
            TreeTagValue={tree.age}
            title="Age"
            icon={<img src={historyIcon} alt="age" />}
          />
        )}
        {tree.gps_accuracy && (
          <TreeTag
            TreeTagValue={tree.gps_accuracy}
            title="GPS Accuracy"
            icon={<img src={accuracyIcon} alt="accuracy" />}
          />
        )}
        {tree.lat && tree.lon && (
          <TreeTag
            TreeTagValue={`${tree.lat}, ${tree.lon}`}
            title="Latitude, Longitude"
            icon={<img src={globalIcon} alt="lat,lon" />}
          />
        )}
        {tree.token_id && (
          <TreeTag
            TreeTagValue={tree.token_id}
            title="Token ID"
            icon={<img src={tokenIcon} alt="token" />}
          />
        )}
      </Box>
      <Box height={20} />
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  const { treeid } = params;
  const tree = await getTreeById(treeid);
  const { planter_id, planting_organization_id } = tree;
  const planter = await getPlanterById(planter_id);
  let organization = null;
  if (planting_organization_id) {
    organization = await getOrganizationById(planting_organization_id);
  }

  return {
    props: {
      tree,
      planter,
      organization,
    },
  };
}
