const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    textAlign: 'center',
  },
  avatar: {
    position: 'relative',
    width: 160,
    height: 160,
		margin: '0 auto 10px',
		cursor: 'pointer',
		'&:hover $overlay': {
			opacity: 1	
	 	},
	},
	image: {
    position: 'absolute',
    borderRadius: '50%',
    width: '100%',
		height: '100%',
		left: 0
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '100%',
    height: '100%',
		background: '#65656587',
		opacity: 0,
		transition: '0.5s'
  },
  
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
  loadingButton: {
    marginLeft: 10
  }
});

export default styles;
