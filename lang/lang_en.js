var lang = {
	tip:{
		loadError:'Load data error',
		loading:'Loading',
		loadData:'Loading Data',
		reboot:'Reboot',
		shutdown:'Shut Down',
		back:'Back',
		ref:'Refresh',
		systemTip:'Warnning',
		passwordTip:'Please input password',
		passwordError:'Please input correct password',
		sub:'Submit',
	},
	play:{
		init:'Connecting',
		download:'Downloading',
		resume:'Resume',
		playBack:'Playback',
		lastWatch:'Resume',
	},
  	start:{
		systemTip:'Notice',
		noDevice:'<p>Can not connect internet</p><p>please check your cable and retry</p>',
		retry:'Retry',
		goIndex:'Enter Index',
		dnsError:'<p>DNS Error</p><p>Make sure network configuration is correct and retry</p>',
		setNetwork:'Network Settings',
		setDNS:'DNS Settings',
		baceMenu:'Back to Index',
		save:'Save Settings ',
		inputCurrentDns1: "Please enter correct DNS1",
        inputCurrentDns2: "Please enter correct DNS2",
		inputCurrentIP: "Please enter correct IP",
        inputCurrentNetmask: "Please enter correct subnet mask",
        inputCurrentGateway: "Please enter correct gateway",
		setIP:"IP Settings",
		netmask: "Subnet Mask",
        gateway: "Gateway",
		ipError:"<p>Fail to get IP</p><p>Please check your network and retry</p>",
		setIP:"IP Settings",
		setPPPoE:"PPPOE Settings",
		pppoeError:"<p>PPPOE connecting fails</p><p>make sure the account and password are correct</p>",
		adslAccount:"ADSL Account",
		adslPassword:"ADSL Password",
		pppoeConnectTip:"<p>PPPoE connecting fails</p><p>make sure server settings is correct and retry</p>",
		setWIFI:'WIFI Settings',
		refreshList:"Refresh List",
		entryPassword:"Please enter password",
		password:"Password",
		safeUpgradeTip:"<p>New security core version available</p><p>please upgrade first</p>",
		upgrade:"Upgrade",
		cancel:"Cancle",
		mainUpgradeTip:'<div>New firmware version available</div><div>Please upgrade ifrst</div>',
		mainPageUpgradeTip:'<div>New page version available</div><div>please upgrade first</div>',	
		loading:'Loading',
		authFailTip: "<p>Connecting server fails,</p><p>please try later<p>",
		noActiveTip:'<p>Your account is not activated yet</p><p>please contact administrator for help</p>',
		expiredTip:'<p>Your account expires</p><p>please recharge</p>',
		Finish:'',
		SettingManual:'Configuring IP manually',
		ManualFail:'Fail to configure IP manually',
		SettingDHCP:'Setting IP by DHCP',
		DHCPFail:'DHCP setting IP fails',
		SettingPPPoE:'Connecting network by PPPOE',
		PPPoEFail:'PPPoE connecting fails',
		ConnectToAP:'Account or password error',
		ConnectToAPFail:'Server error',
		TestingDNS:'Testing DNS',
		DNSFail:'Testing DNS fails',
		Unknown:'Initializing',
	},
	message:{
		message:'Message',
		total:'Total',
		newMes:'News',
		back:'Back',
	},
	live:{
		allType:'ALL',
		errorPlay:'No Signal',
		playing:'Playing',
		buffering:'Buffering',
		favorite_title:'Favorite',
		favorite:'Favorite',
		deleteCollect:'Delete',
		favoriteTip:'Please select a channel',
		favoriteTip2:'This is channel can not be add favorited',
		lockTip:'Lock Channels',
		lock:'Lock',
		epg:'EPG',
		record:'Record',
		unlock:'Unlock',
		lock:'Lock',
		locked:'This channel is locked',
		inputPassword:'Please input password...',
		passwordTip:'Please input correct password.',
		unlockTip:'Unlock success',
		lockTitle:'Contral lock channels',
		favoriteTitle:'Contral favorite channels',
		epgInfo:'Program Infomation Not Found.',
		noticeTip:'You may press the numeric keys to choose channel',
		favoriteNotice:'<div>There are no Favorite channels in this section,</div><div>You may use the green button to add your Favorite channels</div>',
		errorRegion:' is not availiable in this region',
	},
	index:{
		tv: "TV",
		tvDis:'Live Channels',
        movie: "Movies",
		movieDis:'VOD online',
        drama: "Drama",
		dramaDis:'Latest Episodes',
        music: "Music",
		musicDis:'Music Online',
        plus: "APPS",
		appsDis:'More Applications',
        file: "Files",
		filesDis:'Local Files',
        setting: "Settings",
		settingsDis:'System Settings',
        video: "Videos",
        song: "Songs",
		radio:'Radio',
		apps:'Application',
		Radio:'Radio',
		Weather:'Weather',
		Account:'Account',
		News:'RSS',
		Kugou:'Kugou',
		Speed:'Speed Test',
		errorRegion:'This channel can not play in this area',
		message:'Message',
	},
	movie:{
		area:'Region',
		director:'Director',
		actor:'Actor',
		quote:'Introduction',
		index:'Index',
		recentPlay:'Recent Views',
		hot:'Hits',
		newMovie:'Latest',
		watch:'Watch',
		addFav:'Add Favorite',
		delFav:'Delete Favorite',
		favorites:"Favorite",
	},
	setting:{
		title:'System Settings',
		notice:'Notice',
		entryPassword:'Please enter password',
		back:'Back',
		submit:'Submit',
		passTip:'Please enter correct password',
		network:'Network',
		video:'Video',
		aspect:'Screen',
		timezone:'Timezone',
		language:'Language',
		password:'System Password',
		lock:'Lock Password',
		info:'System Info',
		service:'Service',
		setNetwork:{
			title:'Network Settings',
			cable:'Cable',
			pppoe:'PPPOE',
			ip:'IP',
			test:'Testing Connection',
			staticIP:'Static',
			dhcp:'Dynamic',
			gateway:'Gateway',
			cableTitle:'Newwork Settins > Use cable',
			wifiTitle:'Network Settings > WIFI',
			pppoeTitle:'Network settings > PPPoE',
			refresh:'Refresh',
			accountTip:'Account',
			passwordTip:'Password',
			submit:'Submit',
			back:'Back',
			cableTip:'Are you sure want to use the network cable?',
			ref:'Refresh',
			wifiPasswordTip:'Please input WIFI password',
		},
		setService:{
			title:'Set Service',
			serviceTip:'Please input service address',
			submit:'Submit',
		},
		setVideo:{
			title:'Video Settings',
			brightness:'Brightness',
			contrast:'Contrast',
			saturation:'Saturation',
			hue:'Hue',
			scaler:'Scale',
			position:'Positon',
			def:'Reset',
			horizontal:'Horizontal',
			vertical:'Vertical',
		},
		setAspect:{
			title:'Screen Settings',
		},
		setTimezone:{
			title:'Timezone Settings',
			t0: "London，Dublin，Edinburgh",
            t1: "Amsterdam，Berlin，Rome",
            t2: "Istanbul，Cairo，Jerusalem",
            t3: "Lenin Spengler，Moscow，Baghdad，Teheran",
            t4: "Kabul，TbilisiTbilisi，Abu Dhabi",
            t5: "Ekaterinburg，Islamabad，Mumbai，New Delhi，Karachi",
            t6: "Alma Ata，Dhaka，Colombo",
            t7: "Bangkok，Hanoi，Jakarta",
            t8: "Beijing，Chongqing，Shanghai，Hongkong",
            t9: "Adelaide，Darwin，Pyongyang，Seoul，Osaka，Tokyo",
            t10: "Guam，Canberra，Sydney",
            t11: "Magadan，Solomon Islands",
            t12: "Wellington，Marshall Islands",
            t_12: "Eni qivitoq Island，Kwajalein Atoll",
            t_11: "Midway Islands",
            t_10: "Hawaii",
            t_9: "Alaska",
            t_8: "Seattle，San Francisco旧金山，洛杉矶",
            t_7: "Arizona，Salt Lake City",
            t_6: "Mexico City，Houston，Atlanta",
            t_5: "Washington，New York，Lima",
            t_4: "Caracas",
            t_3: "Rio de Janeiro，Buenos Aires，Greeland",
            t_2: "Atlantic",
            t_1: "Cape Verde Islands，Azores",
			cur:'Current Timezone',
		},
		setLang:{
			title:'Language Settings',
			curLang:'Language',
		},
		setPassword:{
			title:'System Password',
			lock:'Lock Password',
			oldPassword:'Old Password',
			newPassword:'New Password',
			repeat_password: "Repeat Password",
			submit:'Submit',
			old_password_mistake: "Old password error",
            new_password_not_empty: "New password can not be null",
            two_password_wrong: "Repeat password differs",
            save_success: "Modify password success",
            save: "Save"
		},
		setInfo:{
			title:'System',
			 hwVersion: "Hardware",
            supplier: "Providers ",
            softwareVersion: "Firmware Version",
            safetyKernel: "Security core version",
            sn: "SN",
		},
	},
	account:{
		package:'My Package',
		list:'package List',
		recharge:'Recharge',
		myPackage:'My package info',
		balance:'Balance',
		expiredDate:'Expiration Date',
		allPackage:"All package Info",
		clickView:"View",
		monthly:"Month",
		quarter:"Season",
		annual:"Year",
		halfAYear:"Half a year",
		desc:"Discription",
		recharge:"Recharge",
		number:"Number",
		password:"Password",
		affirm:"Confirm",
		rechargeSuccess:"Recharge success, your balance is",
		numberError:"Number Error",
		passwordError:"Password Error",
		isUse:"This card number has been used",
		order:'Order',
	},
	weather:{
		dataFormat:"MM month dd day  yyyy year",
		humidity:"Humidity",
		highTemp:"High",
		lowTemp:"Low",
		wind:"Wind",
		addTip:"Can not set up beyond 5 cities",
		selectCountry:"Please select a country name",
		selectCity:"Please select a city name"
		
	},
	youtube:{
		  mostViewed:"Most Viewed",
		  topRated:"Top Rated",
		  mostDiscussed:"Most Discussed",
		  topFavorites:"Top Favorites",
		  featured:"Featured",
		  author:"Actor",
		  programInfo:"Program Info",
		  describe:"Introduction",
		  addDiscussed:"Add Favorite",
		  deleteDiscussed:"Delete Favorite",
		  watchTv:"Watch",
		},
	music:{
			 doubanFM:"Doufan FM",
			 initialize:"Initializing",
			},
	album:{
			    indexPage:"Index",
				singer:"Singer",
				region:"Region",
				hot:'Hot',
				newSong:"Latest",
				favorites:"Add Favorite",
				recentPlay:"Recent Play",
			 },	
	youtubeVod:{
		indexPage:"Index",
		favorites:"Favorite",
		actors:"Actor",
		region:"Region",
		recentPlay:'Recent Play',
		hot:'Hot',
		newMovie:'Latest',
		delFav:'Delete Favorite',
		addFav:'Add Favorite',
		watch:'Watch',
		intro:'Introduction'
	},
	upgrade:{
		upgradeing:'Upgrading',
		upgradeTip:' <div>*Don not shut down system during upgrading process.</div><div>&nbsp;it will reboot after upgrading.</div>',
		systemTip:'Warnning',
		cancelTip:'Do you want to cancle upgrade?',
		yes:'Yes',
		no:'No',
		failTip:'Upgrading fails, please contact administrator.',
		menu:'Back to Index',
	},
}