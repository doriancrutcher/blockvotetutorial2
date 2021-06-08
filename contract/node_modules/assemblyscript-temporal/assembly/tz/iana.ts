import { Rule, DayOfMonth, NextDayAfter, LastDay, AtTimeZone } from "./rule";
import { Zone, ZoneOffset } from "./zone";

// @ts-ignore
@lazy
const zones = createZones();

function createZones(): Map<string, Zone> {
  let zones = new Map<string, Zone>();
  zones.set(
    "EST",
    new Zone("EST", [
      // Zone    EST		 -5:00	-	EST
      new ZoneOffset(-18000000, "-", "EST", -1),
      // Zone    MST		 -7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "HST",
    new Zone("HST", [
      // Zone    HST		-10:00	-	HST
      new ZoneOffset(-36000000, "-", "HST", -1),
      // Zone    EST5EDT		 -5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "CST6CDT",
    new Zone("CST6CDT", [
      // Zone    CST6CDT		 -6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
      // Zone    MST7MDT		 -7:00	US	M%sT
      new ZoneOffset(-25200000, "US", "M%sT", -1),
    ])
  );
  zones.set(
    "PST8PDT",
    new Zone("PST8PDT", [
      // Zone    PST8PDT		 -8:00	US	P%sT
      new ZoneOffset(-28800000, "US", "P%sT", -1),
    ])
  );
  zones.set(
    "America/New_York",
    new Zone("America/New_York", [
      // Zone America/New_York    -4:56:02 -	LMT	1883 Nov 18 12:03:58
      new ZoneOffset(-17762000, "-", "LMT", -2715076620000),
      //     		-5:00	US	E%sT	1920
      new ZoneOffset(-18000000, "US", "E%sT", -1575244800000),
      //     		-5:00	NYC	E%sT	1942
      new ZoneOffset(-18000000, "NYC", "E%sT", -880934400000),
      //     		-5:00	US	E%sT	1946
      new ZoneOffset(-18000000, "US", "E%sT", -754704000000),
      //     		-5:00	NYC	E%sT	1967
      new ZoneOffset(-18000000, "NYC", "E%sT", -92016000000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Chicago",
    new Zone("America/Chicago", [
      // Zone America/Chicago    -5:50:36 -	LMT	1883 Nov 18 12:09:24
      new ZoneOffset(-21036000, "-", "LMT", -2715076260000),
      //     		-6:00	US	C%sT	1920
      new ZoneOffset(-21600000, "US", "C%sT", -1575244800000),
      //     		-6:00	Chicago	C%sT	1936 Mar  1  2:00
      new ZoneOffset(-21600000, "Chicago", "C%sT", -1065132000000),
      //     		-5:00	-	EST	1936 Nov 15  2:00
      new ZoneOffset(-18000000, "-", "EST", -1042840800000),
      //     		-6:00	Chicago	C%sT	1942
      new ZoneOffset(-21600000, "Chicago", "C%sT", -880934400000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00	Chicago	C%sT	1967
      new ZoneOffset(-21600000, "Chicago", "C%sT", -92016000000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/North_Dakota/Center",
    new Zone("America/North_Dakota/Center", [
      // Zone America/North_Dakota/Center -6:45:12 - LMT    1883 Nov 18 12:14:48
      new ZoneOffset(-24312000, "-", "LMT", -2715075960000),
      //     		-7:00	US	M%sT	1992 Oct 25  2:00
      new ZoneOffset(-25200000, "US", "M%sT", 722656800000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/North_Dakota/New_Salem",
    new Zone("America/North_Dakota/New_Salem", [
      // Zone America/North_Dakota/New_Salem -6:45:39 - LMT    1883 Nov 18 12:14:21
      new ZoneOffset(-24339000, "-", "LMT", -2715075960000),
      //     		-7:00	US	M%sT	2003 Oct 26  2:00
      new ZoneOffset(-25200000, "US", "M%sT", 1069812000000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/North_Dakota/Beulah",
    new Zone("America/North_Dakota/Beulah", [
      // Zone America/North_Dakota/Beulah -6:47:07 - LMT    1883 Nov 18 12:12:53
      new ZoneOffset(-24427000, "-", "LMT", -2715076080000),
      //     		-7:00	US	M%sT	2010 Nov  7  2:00
      new ZoneOffset(-25200000, "US", "M%sT", 1291687200000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Denver",
    new Zone("America/Denver", [
      // Zone America/Denver    -6:59:56 -	LMT	1883 Nov 18 12:00:04
      new ZoneOffset(-25196000, "-", "LMT", -2715076800000),
      //     		-7:00	US	M%sT	1920
      new ZoneOffset(-25200000, "US", "M%sT", -1575244800000),
      //     		-7:00	Denver	M%sT	1942
      new ZoneOffset(-25200000, "Denver", "M%sT", -880934400000),
      //     		-7:00	US	M%sT	1946
      new ZoneOffset(-25200000, "US", "M%sT", -754704000000),
      //     		-7:00	Denver	M%sT	1967
      new ZoneOffset(-25200000, "Denver", "M%sT", -92016000000),
      //     		-7:00	US	M%sT
      new ZoneOffset(-25200000, "US", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Los_Angeles",
    new Zone("America/Los_Angeles", [
      // Zone America/Los_Angeles -7:52:58 -    LMT	1883 Nov 18 12:07:02
      new ZoneOffset(-28378000, "-", "LMT", -2715076380000),
      //     		-8:00	US	P%sT	1946
      new ZoneOffset(-28800000, "US", "P%sT", -754704000000),
      //     		-8:00	CA	P%sT	1967
      new ZoneOffset(-28800000, "CA", "P%sT", -92016000000),
      //     		-8:00	US	P%sT
      new ZoneOffset(-28800000, "US", "P%sT", -1),
    ])
  );
  zones.set(
    "America/Juneau",
    new Zone("America/Juneau", [
      // Zone America/Juneau     15:02:19 -	LMT	1867 Oct 19 15:33:32
      new ZoneOffset(54139000, "-", "LMT", -3222491220000),
      //     		 -8:57:41 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-32261000, "-", "LMT", -2186308800000),
      //     		 -8:00	-	PST	1942
      new ZoneOffset(-28800000, "-", "PST", -880934400000),
      //     		 -8:00	US	P%sT	1946
      new ZoneOffset(-28800000, "US", "P%sT", -754704000000),
      //     		 -8:00	-	PST	1969
      new ZoneOffset(-28800000, "-", "PST", -28857600000),
      //     		 -8:00	US	P%sT	1980 Apr 27  2:00
      new ZoneOffset(-28800000, "US", "P%sT", 328240800000),
      //     		 -9:00	US	Y%sT	1980 Oct 26  2:00
      new ZoneOffset(-32400000, "US", "Y%sT", 344052000000),
      //     		 -8:00	US	P%sT	1983 Oct 30  2:00
      new ZoneOffset(-28800000, "US", "P%sT", 439005600000),
      //     		 -9:00	US	Y%sT	1983 Nov 30
      new ZoneOffset(-32400000, "US", "Y%sT", 441590400000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Sitka",
    new Zone("America/Sitka", [
      // Zone America/Sitka     14:58:47 -	LMT	1867 Oct 19 15:30
      new ZoneOffset(53927000, "-", "LMT", -3222491400000),
      //     		 -9:01:13 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-32473000, "-", "LMT", -2186308800000),
      //     		 -8:00	-	PST	1942
      new ZoneOffset(-28800000, "-", "PST", -880934400000),
      //     		 -8:00	US	P%sT	1946
      new ZoneOffset(-28800000, "US", "P%sT", -754704000000),
      //     		 -8:00	-	PST	1969
      new ZoneOffset(-28800000, "-", "PST", -28857600000),
      //     		 -8:00	US	P%sT	1983 Oct 30  2:00
      new ZoneOffset(-28800000, "US", "P%sT", 439005600000),
      //     		 -9:00	US	Y%sT	1983 Nov 30
      new ZoneOffset(-32400000, "US", "Y%sT", 441590400000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Metlakatla",
    new Zone("America/Metlakatla", [
      // Zone America/Metlakatla     15:13:42 -	LMT	1867 Oct 19 15:44:55
      new ZoneOffset(54822000, "-", "LMT", -3222490560000),
      //     		 -8:46:18 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-31578000, "-", "LMT", -2186308800000),
      //     		 -8:00	-	PST	1942
      new ZoneOffset(-28800000, "-", "PST", -880934400000),
      //     		 -8:00	US	P%sT	1946
      new ZoneOffset(-28800000, "US", "P%sT", -754704000000),
      //     		 -8:00	-	PST	1969
      new ZoneOffset(-28800000, "-", "PST", -28857600000),
      //     		 -8:00	US	P%sT	1983 Oct 30  2:00
      new ZoneOffset(-28800000, "US", "P%sT", 439005600000),
      //     		 -8:00	-	PST	2015 Nov  1  2:00
      new ZoneOffset(-28800000, "-", "PST", 1448935200000),
      //     		 -9:00	US	AK%sT	2018 Nov  4  2:00
      new ZoneOffset(-32400000, "US", "AK%sT", 1543888800000),
      //     		 -8:00	-	PST	2019 Jan 20  2:00
      new ZoneOffset(-28800000, "-", "PST", 1550628000000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Yakutat",
    new Zone("America/Yakutat", [
      // Zone America/Yakutat     14:41:05 -	LMT	1867 Oct 19 15:12:18
      new ZoneOffset(52865000, "-", "LMT", -3222492480000),
      //     		 -9:18:55 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-33535000, "-", "LMT", -2186308800000),
      //     		 -9:00	-	YST	1942
      new ZoneOffset(-32400000, "-", "YST", -880934400000),
      //     		 -9:00	US	Y%sT	1946
      new ZoneOffset(-32400000, "US", "Y%sT", -754704000000),
      //     		 -9:00	-	YST	1969
      new ZoneOffset(-32400000, "-", "YST", -28857600000),
      //     		 -9:00	US	Y%sT	1983 Nov 30
      new ZoneOffset(-32400000, "US", "Y%sT", 441590400000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Anchorage",
    new Zone("America/Anchorage", [
      // Zone America/Anchorage     14:00:24 -	LMT	1867 Oct 19 14:31:37
      new ZoneOffset(50424000, "-", "LMT", -3222494940000),
      //     		 -9:59:36 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-35976000, "-", "LMT", -2186308800000),
      //     		-10:00	-	AST	1942
      new ZoneOffset(-36000000, "-", "AST", -880934400000),
      //     		-10:00	US	A%sT	1967 Apr
      new ZoneOffset(-36000000, "US", "A%sT", -84326400000),
      //     		-10:00	-	AHST	1969
      new ZoneOffset(-36000000, "-", "AHST", -28857600000),
      //     		-10:00	US	AH%sT	1983 Oct 30  2:00
      new ZoneOffset(-36000000, "US", "AH%sT", 439005600000),
      //     		 -9:00	US	Y%sT	1983 Nov 30
      new ZoneOffset(-32400000, "US", "Y%sT", 441590400000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Nome",
    new Zone("America/Nome", [
      // Zone America/Nome     12:58:22 -	LMT	1867 Oct 19 13:29:35
      new ZoneOffset(46702000, "-", "LMT", -3222498660000),
      //     		-11:01:38 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-39698000, "-", "LMT", -2186308800000),
      //     		-11:00	-	NST	1942
      new ZoneOffset(-39600000, "-", "NST", -880934400000),
      //     		-11:00	US	N%sT	1946
      new ZoneOffset(-39600000, "US", "N%sT", -754704000000),
      //     		-11:00	-	NST	1967 Apr
      new ZoneOffset(-39600000, "-", "NST", -84326400000),
      //     		-11:00	-	BST	1969
      new ZoneOffset(-39600000, "-", "BST", -28857600000),
      //     		-11:00	US	B%sT	1983 Oct 30  2:00
      new ZoneOffset(-39600000, "US", "B%sT", 439005600000),
      //     		 -9:00	US	Y%sT	1983 Nov 30
      new ZoneOffset(-32400000, "US", "Y%sT", 441590400000),
      //     		 -9:00	US	AK%sT
      new ZoneOffset(-32400000, "US", "AK%sT", -1),
    ])
  );
  zones.set(
    "America/Adak",
    new Zone("America/Adak", [
      // Zone America/Adak     12:13:22 -	LMT	1867 Oct 19 12:44:35
      new ZoneOffset(44002000, "-", "LMT", -3222501360000),
      //     		-11:46:38 -	LMT	1900 Aug 20 12:00
      new ZoneOffset(-42398000, "-", "LMT", -2186308800000),
      //     		-11:00	-	NST	1942
      new ZoneOffset(-39600000, "-", "NST", -880934400000),
      //     		-11:00	US	N%sT	1946
      new ZoneOffset(-39600000, "US", "N%sT", -754704000000),
      //     		-11:00	-	NST	1967 Apr
      new ZoneOffset(-39600000, "-", "NST", -84326400000),
      //     		-11:00	-	BST	1969
      new ZoneOffset(-39600000, "-", "BST", -28857600000),
      //     		-11:00	US	B%sT	1983 Oct 30  2:00
      new ZoneOffset(-39600000, "US", "B%sT", 439005600000),
      //     		-10:00	US	AH%sT	1983 Nov 30
      new ZoneOffset(-36000000, "US", "AH%sT", 441590400000),
      //     		-10:00	US	H%sT
      new ZoneOffset(-36000000, "US", "H%sT", -1),
    ])
  );
  zones.set(
    "Pacific/Honolulu",
    new Zone("Pacific/Honolulu", [
      // Zone Pacific/Honolulu    -10:31:26 -	LMT	1896 Jan 13 12:00
      new ZoneOffset(-37886000, "-", "LMT", -2331460800000),
      //     		-10:30	-	HST	1933 Apr 30  2:00
      new ZoneOffset(-37800000, "-", "HST", -1154728800000),
      //     		-10:30	1:00	HDT	1933 May 21 12:00
      new ZoneOffset(-37800000, "1:00", "HDT", -1152792000000),
      //     		-10:30	US	H%sT	1947 Jun  8  2:00
      new ZoneOffset(-37800000, "US", "H%sT", -709596000000),
      //     		-10:00	-	HST
      new ZoneOffset(-36000000, "-", "HST", -1),
    ])
  );
  zones.set(
    "America/Phoenix",
    new Zone("America/Phoenix", [
      // Zone America/Phoenix    -7:28:18 -	LMT	1883 Nov 18 11:31:42
      new ZoneOffset(-26898000, "-", "LMT", -2715078540000),
      //     		-7:00	US	M%sT	1944 Jan  1  0:01
      new ZoneOffset(-25200000, "US", "M%sT", -817862340000),
      //     		-7:00	-	MST	1944 Apr  1  0:01
      new ZoneOffset(-25200000, "-", "MST", -810086340000),
      //     		-7:00	US	M%sT	1944 Oct  1  0:01
      new ZoneOffset(-25200000, "US", "M%sT", -794188740000),
      //     		-7:00	-	MST	1967
      new ZoneOffset(-25200000, "-", "MST", -92016000000),
      //     		-7:00	US	M%sT	1968 Mar 21
      new ZoneOffset(-25200000, "US", "M%sT", -53568000000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Boise",
    new Zone("America/Boise", [
      // Zone America/Boise    -7:44:49 -	LMT	1883 Nov 18 12:15:11
      new ZoneOffset(-27889000, "-", "LMT", -2715075900000),
      //     		-8:00	US	P%sT	1923 May 13  2:00
      new ZoneOffset(-28800000, "US", "P%sT", -1469138400000),
      //     		-7:00	US	M%sT	1974
      new ZoneOffset(-25200000, "US", "M%sT", 128908800000),
      //     		-7:00	-	MST	1974 Feb  3  2:00
      new ZoneOffset(-25200000, "-", "MST", 131508000000),
      //     		-7:00	US	M%sT
      new ZoneOffset(-25200000, "US", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Indianapolis",
    new Zone("America/Indiana/Indianapolis", [
      // Zone America/Indiana/Indianapolis -5:44:38 - LMT    1883 Nov 18 12:15:22
      new ZoneOffset(-20678000, "-", "LMT", -2715075900000),
      //     		-6:00	US	C%sT	1920
      new ZoneOffset(-21600000, "US", "C%sT", -1575244800000),
      //     		-6:00 Indianapolis C%sT	1942
      new ZoneOffset(-21600000, "Indianapolis", "C%sT", -880934400000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00 Indianapolis C%sT	1955 Apr 24  2:00
      new ZoneOffset(-21600000, "Indianapolis", "C%sT", -461023200000),
      //     		-5:00	-	EST	1957 Sep 29  2:00
      new ZoneOffset(-18000000, "-", "EST", -384213600000),
      //     		-6:00	-	CST	1958 Apr 27  2:00
      new ZoneOffset(-21600000, "-", "CST", -366069600000),
      //     		-5:00	-	EST	1969
      new ZoneOffset(-18000000, "-", "EST", -28857600000),
      //     		-5:00	US	E%sT	1971
      new ZoneOffset(-18000000, "US", "E%sT", 34214400000),
      //     		-5:00	-	EST	2006
      new ZoneOffset(-18000000, "-", "EST", 1138752000000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Marengo",
    new Zone("America/Indiana/Marengo", [
      // Zone America/Indiana/Marengo -5:45:23 -    LMT	1883 Nov 18 12:14:37
      new ZoneOffset(-20723000, "-", "LMT", -2715075960000),
      //     		-6:00	US	C%sT	1951
      new ZoneOffset(-21600000, "US", "C%sT", -596937600000),
      //     		-6:00	Marengo	C%sT	1961 Apr 30  2:00
      new ZoneOffset(-21600000, "Marengo", "C%sT", -271116000000),
      //     		-5:00	-	EST	1969
      new ZoneOffset(-18000000, "-", "EST", -28857600000),
      //     		-5:00	US	E%sT	1974 Jan  6  2:00
      new ZoneOffset(-18000000, "US", "E%sT", 129348000000),
      //     		-6:00	1:00	CDT	1974 Oct 27  2:00
      new ZoneOffset(-21600000, "1:00", "CDT", 154749600000),
      //     		-5:00	US	E%sT	1976
      new ZoneOffset(-18000000, "US", "E%sT", 191980800000),
      //     		-5:00	-	EST	2006
      new ZoneOffset(-18000000, "-", "EST", 1138752000000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Vincennes",
    new Zone("America/Indiana/Vincennes", [
      // Zone America/Indiana/Vincennes -5:50:07 - LMT    1883 Nov 18 12:09:53
      new ZoneOffset(-21007000, "-", "LMT", -2715076260000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00 Vincennes	C%sT	1964 Apr 26  2:00
      new ZoneOffset(-21600000, "Vincennes", "C%sT", -176767200000),
      //     		-5:00	-	EST	1969
      new ZoneOffset(-18000000, "-", "EST", -28857600000),
      //     		-5:00	US	E%sT	1971
      new ZoneOffset(-18000000, "US", "E%sT", 34214400000),
      //     		-5:00	-	EST	2006 Apr  2  2:00
      new ZoneOffset(-18000000, "-", "EST", 1146535200000),
      //     		-6:00	US	C%sT	2007 Nov  4  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 1196733600000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Tell_City",
    new Zone("America/Indiana/Tell_City", [
      // Zone America/Indiana/Tell_City -5:47:03 - LMT    1883 Nov 18 12:12:57
      new ZoneOffset(-20823000, "-", "LMT", -2715076080000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00 Perry	C%sT	1964 Apr 26  2:00
      new ZoneOffset(-21600000, "Perry", "C%sT", -176767200000),
      //     		-5:00	-	EST	1967 Oct 29  2:00
      new ZoneOffset(-18000000, "-", "EST", -66002400000),
      //     		-6:00	US	C%sT	1969 Apr 27  2:00
      new ZoneOffset(-21600000, "US", "C%sT", -18914400000),
      //     		-5:00	US	E%sT	1971
      new ZoneOffset(-18000000, "US", "E%sT", 34214400000),
      //     		-5:00	-	EST	2006 Apr  2  2:00
      new ZoneOffset(-18000000, "-", "EST", 1146535200000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Petersburg",
    new Zone("America/Indiana/Petersburg", [
      // Zone America/Indiana/Petersburg -5:49:07 - LMT    1883 Nov 18 12:10:53
      new ZoneOffset(-20947000, "-", "LMT", -2715076200000),
      //     		-6:00	US	C%sT	1955
      new ZoneOffset(-21600000, "US", "C%sT", -470707200000),
      //     		-6:00	Pike	C%sT	1965 Apr 25  2:00
      new ZoneOffset(-21600000, "Pike", "C%sT", -145317600000),
      //     		-5:00	-	EST	1966 Oct 30  2:00
      new ZoneOffset(-18000000, "-", "EST", -97452000000),
      //     		-6:00	US	C%sT	1977 Oct 30  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 249703200000),
      //     		-5:00	-	EST	2006 Apr  2  2:00
      new ZoneOffset(-18000000, "-", "EST", 1146535200000),
      //     		-6:00	US	C%sT	2007 Nov  4  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 1196733600000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Knox",
    new Zone("America/Indiana/Knox", [
      // Zone America/Indiana/Knox -5:46:30 -    LMT	1883 Nov 18 12:13:30
      new ZoneOffset(-20790000, "-", "LMT", -2715076020000),
      //     		-6:00	US	C%sT	1947
      new ZoneOffset(-21600000, "US", "C%sT", -723168000000),
      //     		-6:00	Starke	C%sT	1962 Apr 29  2:00
      new ZoneOffset(-21600000, "Starke", "C%sT", -239666400000),
      //     		-5:00	-	EST	1963 Oct 27  2:00
      new ZoneOffset(-18000000, "-", "EST", -192405600000),
      //     		-6:00	US	C%sT	1991 Oct 27  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 691207200000),
      //     		-5:00	-	EST	2006 Apr  2  2:00
      new ZoneOffset(-18000000, "-", "EST", 1146535200000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Winamac",
    new Zone("America/Indiana/Winamac", [
      // Zone America/Indiana/Winamac -5:46:25 - LMT    1883 Nov 18 12:13:35
      new ZoneOffset(-20785000, "-", "LMT", -2715076020000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00	Pulaski	C%sT	1961 Apr 30  2:00
      new ZoneOffset(-21600000, "Pulaski", "C%sT", -271116000000),
      //     		-5:00	-	EST	1969
      new ZoneOffset(-18000000, "-", "EST", -28857600000),
      //     		-5:00	US	E%sT	1971
      new ZoneOffset(-18000000, "US", "E%sT", 34214400000),
      //     		-5:00	-	EST	2006 Apr  2  2:00
      new ZoneOffset(-18000000, "-", "EST", 1146535200000),
      //     		-6:00	US	C%sT	2007 Mar 11  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 1176256800000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Indiana/Vevay",
    new Zone("America/Indiana/Vevay", [
      // Zone America/Indiana/Vevay -5:40:16 -    LMT	1883 Nov 18 12:19:44
      new ZoneOffset(-20416000, "-", "LMT", -2715075660000),
      //     		-6:00	US	C%sT	1954 Apr 25  2:00
      new ZoneOffset(-21600000, "US", "C%sT", -492472800000),
      //     		-5:00	-	EST	1969
      new ZoneOffset(-18000000, "-", "EST", -28857600000),
      //     		-5:00	US	E%sT	1973
      new ZoneOffset(-18000000, "US", "E%sT", 97372800000),
      //     		-5:00	-	EST	2006
      new ZoneOffset(-18000000, "-", "EST", 1138752000000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Kentucky/Louisville",
    new Zone("America/Kentucky/Louisville", [
      // Zone America/Kentucky/Louisville -5:43:02 -    LMT	1883 Nov 18 12:16:58
      new ZoneOffset(-20582000, "-", "LMT", -2715075840000),
      //     		-6:00	US	C%sT	1921
      new ZoneOffset(-21600000, "US", "C%sT", -1543622400000),
      //     		-6:00 Louisville C%sT	1942
      new ZoneOffset(-21600000, "Louisville", "C%sT", -880934400000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00 Louisville C%sT	1961 Jul 23  2:00
      new ZoneOffset(-21600000, "Louisville", "C%sT", -263772000000),
      //     		-5:00	-	EST	1968
      new ZoneOffset(-18000000, "-", "EST", -60480000000),
      //     		-5:00	US	E%sT	1974 Jan  6  2:00
      new ZoneOffset(-18000000, "US", "E%sT", 129348000000),
      //     		-6:00	1:00	CDT	1974 Oct 27  2:00
      new ZoneOffset(-21600000, "1:00", "CDT", 154749600000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Kentucky/Monticello",
    new Zone("America/Kentucky/Monticello", [
      // Zone America/Kentucky/Monticello -5:39:24 - LMT    1883 Nov 18 12:20:36
      new ZoneOffset(-20364000, "-", "LMT", -2715075600000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00	-	CST	1968
      new ZoneOffset(-21600000, "-", "CST", -60480000000),
      //     		-6:00	US	C%sT	2000 Oct 29  2:00
      new ZoneOffset(-21600000, "US", "C%sT", 975463200000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Detroit",
    new Zone("America/Detroit", [
      // Zone America/Detroit    -5:32:11 -	LMT	1905
      new ZoneOffset(-19931000, "-", "LMT", -2048544000000),
      //     		-6:00	-	CST	1915 May 15  2:00
      new ZoneOffset(-21600000, "-", "CST", -1721426400000),
      //     		-5:00	-	EST	1942
      new ZoneOffset(-18000000, "-", "EST", -880934400000),
      //     		-5:00	US	E%sT	1946
      new ZoneOffset(-18000000, "US", "E%sT", -754704000000),
      //     		-5:00	Detroit	E%sT	1967 Jun 14  0:01
      new ZoneOffset(-18000000, "Detroit", "E%sT", -77932740000),
      //     		-5:00	US	E%sT	1969
      new ZoneOffset(-18000000, "US", "E%sT", -28857600000),
      //     		-5:00	-	EST	1973
      new ZoneOffset(-18000000, "-", "EST", 97372800000),
      //     		-5:00	US	E%sT	1975
      new ZoneOffset(-18000000, "US", "E%sT", 160444800000),
      //     		-5:00	-	EST	1975 Apr 27  2:00
      new ZoneOffset(-18000000, "-", "EST", 170388000000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Menominee",
    new Zone("America/Menominee", [
      // Zone America/Menominee    -5:50:27 -	LMT	1885 Sep 18 12:00
      new ZoneOffset(-21027000, "-", "LMT", -2657188800000),
      //     		-6:00	US	C%sT	1946
      new ZoneOffset(-21600000, "US", "C%sT", -754704000000),
      //     		-6:00 Menominee	C%sT	1969 Apr 27  2:00
      new ZoneOffset(-21600000, "Menominee", "C%sT", -18914400000),
      //     		-5:00	-	EST	1973 Apr 29  2:00
      new ZoneOffset(-18000000, "-", "EST", 107488800000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/St_Johns",
    new Zone("America/St_Johns", [
      // Zone America/St_Johns    -3:30:52 -	LMT	1884
      new ZoneOffset(-12652000, "-", "LMT", -2711232000000),
      //     		-3:30:52 StJohns N%sT	1918
      new ZoneOffset(-12652000, "StJohns", "N%sT", -1638316800000),
      //     		-3:30:52 Canada	N%sT	1919
      new ZoneOffset(-12652000, "Canada", "N%sT", -1606780800000),
      //     		-3:30:52 StJohns N%sT	1935 Mar 30
      new ZoneOffset(-12652000, "StJohns", "N%sT", -1094256000000),
      //     		-3:30	StJohns	N%sT	1942 May 11
      new ZoneOffset(-12600000, "StJohns", "N%sT", -869702400000),
      //     		-3:30	Canada	N%sT	1946
      new ZoneOffset(-12600000, "Canada", "N%sT", -754704000000),
      //     		-3:30	StJohns	N%sT	2011 Nov
      new ZoneOffset(-12600000, "StJohns", "N%sT", 1322697600000),
      //     		-3:30	Canada	N%sT
      new ZoneOffset(-12600000, "Canada", "N%sT", -1),
    ])
  );
  zones.set(
    "America/Goose_Bay",
    new Zone("America/Goose_Bay", [
      // Zone America/Goose_Bay    -4:01:40 -	LMT	1884 # Happy Valley-Goose Bay
      new ZoneOffset(-14500000, "-", "LMT", -2711232000000),
      //     		-3:30:52 -	NST	1918
      new ZoneOffset(-12652000, "-", "NST", -1638316800000),
      //     		-3:30:52 Canada N%sT	1919
      new ZoneOffset(-12652000, "Canada", "N%sT", -1606780800000),
      //     		-3:30:52 -	NST	1935 Mar 30
      new ZoneOffset(-12652000, "-", "NST", -1094256000000),
      //     		-3:30	-	NST	1936
      new ZoneOffset(-12600000, "-", "NST", -1070323200000),
      //     		-3:30	StJohns	N%sT	1942 May 11
      new ZoneOffset(-12600000, "StJohns", "N%sT", -869702400000),
      //     		-3:30	Canada	N%sT	1946
      new ZoneOffset(-12600000, "Canada", "N%sT", -754704000000),
      //     		-3:30	StJohns	N%sT	1966 Mar 15  2:00
      new ZoneOffset(-12600000, "StJohns", "N%sT", -117237600000),
      //     		-4:00	StJohns	A%sT	2011 Nov
      new ZoneOffset(-14400000, "StJohns", "A%sT", 1322697600000),
      //     		-4:00	Canada	A%sT
      new ZoneOffset(-14400000, "Canada", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Halifax",
    new Zone("America/Halifax", [
      // Zone America/Halifax    -4:14:24 -	LMT	1902 Jun 15
      new ZoneOffset(-15264000, "-", "LMT", -2129068800000),
      //     		-4:00	Halifax	A%sT	1918
      new ZoneOffset(-14400000, "Halifax", "A%sT", -1638316800000),
      //     		-4:00	Canada	A%sT	1919
      new ZoneOffset(-14400000, "Canada", "A%sT", -1606780800000),
      //     		-4:00	Halifax	A%sT	1942 Feb  9  2:00s
      new ZoneOffset(-14400000, "Halifax", "A%sT", -877816800000),
      //     		-4:00	Canada	A%sT	1946
      new ZoneOffset(-14400000, "Canada", "A%sT", -754704000000),
      //     		-4:00	Halifax	A%sT	1974
      new ZoneOffset(-14400000, "Halifax", "A%sT", 128908800000),
      //     		-4:00	Canada	A%sT
      new ZoneOffset(-14400000, "Canada", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Glace_Bay",
    new Zone("America/Glace_Bay", [
      // Zone America/Glace_Bay    -3:59:48 -	LMT	1902 Jun 15
      new ZoneOffset(-14388000, "-", "LMT", -2129068800000),
      //     		-4:00	Canada	A%sT	1953
      new ZoneOffset(-14400000, "Canada", "A%sT", -533779200000),
      //     		-4:00	Halifax	A%sT	1954
      new ZoneOffset(-14400000, "Halifax", "A%sT", -502243200000),
      //     		-4:00	-	AST	1972
      new ZoneOffset(-14400000, "-", "AST", 65750400000),
      //     		-4:00	Halifax	A%sT	1974
      new ZoneOffset(-14400000, "Halifax", "A%sT", 128908800000),
      //     		-4:00	Canada	A%sT
      new ZoneOffset(-14400000, "Canada", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Moncton",
    new Zone("America/Moncton", [
      // Zone America/Moncton    -4:19:08 -	LMT	1883 Dec  9
      new ZoneOffset(-15548000, "-", "LMT", -2713219200000),
      //     		-5:00	-	EST	1902 Jun 15
      new ZoneOffset(-18000000, "-", "EST", -2129068800000),
      //     		-4:00	Canada	A%sT	1933
      new ZoneOffset(-14400000, "Canada", "A%sT", -1164931200000),
      //     		-4:00	Moncton	A%sT	1942
      new ZoneOffset(-14400000, "Moncton", "A%sT", -880934400000),
      //     		-4:00	Canada	A%sT	1946
      new ZoneOffset(-14400000, "Canada", "A%sT", -754704000000),
      //     		-4:00	Moncton	A%sT	1973
      new ZoneOffset(-14400000, "Moncton", "A%sT", 97372800000),
      //     		-4:00	Canada	A%sT	1993
      new ZoneOffset(-14400000, "Canada", "A%sT", 728524800000),
      //     		-4:00	Moncton	A%sT	2007
      new ZoneOffset(-14400000, "Moncton", "A%sT", 1170288000000),
      //     		-4:00	Canada	A%sT
      new ZoneOffset(-14400000, "Canada", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Blanc-Sablon",
    new Zone("America/Blanc-Sablon", [
      // Zone America/Blanc-Sablon -3:48:28 -    LMT	1884
      new ZoneOffset(-13708000, "-", "LMT", -2711232000000),
      //     		-4:00	Canada	A%sT	1970
      new ZoneOffset(-14400000, "Canada", "A%sT", 2678400000),
      //     		-4:00	-	AST
      new ZoneOffset(-14400000, "-", "AST", -1),
    ])
  );
  zones.set(
    "America/Toronto",
    new Zone("America/Toronto", [
      // Zone America/Toronto    -5:17:32 -	LMT	1895
      new ZoneOffset(-19052000, "-", "LMT", -2364076800000),
      //     		-5:00	Canada	E%sT	1919
      new ZoneOffset(-18000000, "Canada", "E%sT", -1606780800000),
      //     		-5:00	Toronto	E%sT	1942 Feb  9  2:00s
      new ZoneOffset(-18000000, "Toronto", "E%sT", -877816800000),
      //     		-5:00	Canada	E%sT	1946
      new ZoneOffset(-18000000, "Canada", "E%sT", -754704000000),
      //     		-5:00	Toronto	E%sT	1974
      new ZoneOffset(-18000000, "Toronto", "E%sT", 128908800000),
      //     		-5:00	Canada	E%sT
      new ZoneOffset(-18000000, "Canada", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Thunder_Bay",
    new Zone("America/Thunder_Bay", [
      // Zone America/Thunder_Bay -5:57:00 -    LMT	1895
      new ZoneOffset(-21420000, "-", "LMT", -2364076800000),
      //     		-6:00	-	CST	1910
      new ZoneOffset(-21600000, "-", "CST", -1890777600000),
      //     		-5:00	-	EST	1942
      new ZoneOffset(-18000000, "-", "EST", -880934400000),
      //     		-5:00	Canada	E%sT	1970
      new ZoneOffset(-18000000, "Canada", "E%sT", 2678400000),
      //     		-5:00	Toronto	E%sT	1973
      new ZoneOffset(-18000000, "Toronto", "E%sT", 97372800000),
      //     		-5:00	-	EST	1974
      new ZoneOffset(-18000000, "-", "EST", 128908800000),
      //     		-5:00	Canada	E%sT
      new ZoneOffset(-18000000, "Canada", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Nipigon",
    new Zone("America/Nipigon", [
      // Zone America/Nipigon    -5:53:04 -	LMT	1895
      new ZoneOffset(-21184000, "-", "LMT", -2364076800000),
      //     		-5:00	Canada	E%sT	1940 Sep 29
      new ZoneOffset(-18000000, "Canada", "E%sT", -920678400000),
      //     		-5:00	1:00	EDT	1942 Feb  9  2:00s
      new ZoneOffset(-18000000, "1:00", "EDT", -877816800000),
      //     		-5:00	Canada	E%sT
      new ZoneOffset(-18000000, "Canada", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Rainy_River",
    new Zone("America/Rainy_River", [
      // Zone America/Rainy_River -6:18:16 -    LMT	1895
      new ZoneOffset(-22696000, "-", "LMT", -2364076800000),
      //     		-6:00	Canada	C%sT	1940 Sep 29
      new ZoneOffset(-21600000, "Canada", "C%sT", -920678400000),
      //     		-6:00	1:00	CDT	1942 Feb  9  2:00s
      new ZoneOffset(-21600000, "1:00", "CDT", -877816800000),
      //     		-6:00	Canada	C%sT
      new ZoneOffset(-21600000, "Canada", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Atikokan",
    new Zone("America/Atikokan", [
      // Zone America/Atikokan    -6:06:28 -	LMT	1895
      new ZoneOffset(-21988000, "-", "LMT", -2364076800000),
      //     		-6:00	Canada	C%sT	1940 Sep 29
      new ZoneOffset(-21600000, "Canada", "C%sT", -920678400000),
      //     		-6:00	1:00	CDT	1942 Feb  9  2:00s
      new ZoneOffset(-21600000, "1:00", "CDT", -877816800000),
      //     		-6:00	Canada	C%sT	1945 Sep 30  2:00
      new ZoneOffset(-21600000, "Canada", "C%sT", -762818400000),
      //     		-5:00	-	EST
      new ZoneOffset(-18000000, "-", "EST", -1),
    ])
  );
  zones.set(
    "America/Winnipeg",
    new Zone("America/Winnipeg", [
      // Zone America/Winnipeg    -6:28:36 -	LMT	1887 Jul 16
      new ZoneOffset(-23316000, "-", "LMT", -2599603200000),
      //     		-6:00	Winn	C%sT	2006
      new ZoneOffset(-21600000, "Winn", "C%sT", 1138752000000),
      //     		-6:00	Canada	C%sT
      new ZoneOffset(-21600000, "Canada", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Regina",
    new Zone("America/Regina", [
      // Zone America/Regina    -6:58:36 -	LMT	1905 Sep
      new ZoneOffset(-25116000, "-", "LMT", -2027635200000),
      //     		-7:00	Regina	M%sT	1960 Apr lastSun  2:00
      new ZoneOffset(-25200000, "Regina", "M%sT", -305164800000),
      //     		-6:00	-	CST
      new ZoneOffset(-21600000, "-", "CST", -1),
    ])
  );
  zones.set(
    "America/Swift_Current",
    new Zone("America/Swift_Current", [
      // Zone America/Swift_Current -7:11:20 -    LMT	1905 Sep
      new ZoneOffset(-25880000, "-", "LMT", -2027635200000),
      //     		-7:00	Canada	M%sT	1946 Apr lastSun  2:00
      new ZoneOffset(-25200000, "Canada", "M%sT", -747014400000),
      //     		-7:00	Regina	M%sT	1950
      new ZoneOffset(-25200000, "Regina", "M%sT", -628473600000),
      //     		-7:00	Swift	M%sT	1972 Apr lastSun  2:00
      new ZoneOffset(-25200000, "Swift", "M%sT", 73526400000),
      //     		-6:00	-	CST
      new ZoneOffset(-21600000, "-", "CST", -1),
    ])
  );
  zones.set(
    "America/Edmonton",
    new Zone("America/Edmonton", [
      // Zone America/Edmonton    -7:33:52 -	LMT	1906 Sep
      new ZoneOffset(-27232000, "-", "LMT", -1996099200000),
      //     		-7:00	Edm	M%sT	1987
      new ZoneOffset(-25200000, "Edm", "M%sT", 539136000000),
      //     		-7:00	Canada	M%sT
      new ZoneOffset(-25200000, "Canada", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Vancouver",
    new Zone("America/Vancouver", [
      // Zone America/Vancouver    -8:12:28 -	LMT	1884
      new ZoneOffset(-29548000, "-", "LMT", -2711232000000),
      //     		-8:00	Vanc	P%sT	1987
      new ZoneOffset(-28800000, "Vanc", "P%sT", 539136000000),
      //     		-8:00	Canada	P%sT
      new ZoneOffset(-28800000, "Canada", "P%sT", -1),
    ])
  );
  zones.set(
    "America/Dawson_Creek",
    new Zone("America/Dawson_Creek", [
      // Zone America/Dawson_Creek -8:00:56 -    LMT	1884
      new ZoneOffset(-28856000, "-", "LMT", -2711232000000),
      //     		-8:00	Canada	P%sT	1947
      new ZoneOffset(-28800000, "Canada", "P%sT", -723168000000),
      //     		-8:00	Vanc	P%sT	1972 Aug 30  2:00
      new ZoneOffset(-28800000, "Vanc", "P%sT", 86666400000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Fort_Nelson",
    new Zone("America/Fort_Nelson", [
      // Zone America/Fort_Nelson    -8:10:47 -	LMT	1884
      new ZoneOffset(-29447000, "-", "LMT", -2711232000000),
      //     		-8:00	Vanc	P%sT	1946
      new ZoneOffset(-28800000, "Vanc", "P%sT", -754704000000),
      //     		-8:00	-	PST	1947
      new ZoneOffset(-28800000, "-", "PST", -723168000000),
      //     		-8:00	Vanc	P%sT	1987
      new ZoneOffset(-28800000, "Vanc", "P%sT", 539136000000),
      //     		-8:00	Canada	P%sT	2015 Mar  8  2:00
      new ZoneOffset(-28800000, "Canada", "P%sT", 1428458400000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Creston",
    new Zone("America/Creston", [
      // Zone America/Creston    -7:46:04 -	LMT	1884
      new ZoneOffset(-27964000, "-", "LMT", -2711232000000),
      //     		-7:00	-	MST	1916 Oct 1
      new ZoneOffset(-25200000, "-", "MST", -1677801600000),
      //     		-8:00	-	PST	1918 Jun 2
      new ZoneOffset(-28800000, "-", "PST", -1625270400000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Whitehorse",
    new Zone("America/Whitehorse", [
      // Zone America/Whitehorse    -9:00:12 -	LMT	1900 Aug 20
      new ZoneOffset(-32412000, "-", "LMT", -2186352000000),
      //     		-9:00	NT_YK	Y%sT	1967 May 28  0:00
      new ZoneOffset(-32400000, "NT_YK", "Y%sT", -79315200000),
      //     		-8:00	NT_YK	P%sT	1980
      new ZoneOffset(-28800000, "NT_YK", "P%sT", 318211200000),
      //     		-8:00	Canada	P%sT	2020 Nov  1
      new ZoneOffset(-28800000, "Canada", "P%sT", 1606780800000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Dawson",
    new Zone("America/Dawson", [
      // Zone America/Dawson    -9:17:40 -	LMT	1900 Aug 20
      new ZoneOffset(-33460000, "-", "LMT", -2186352000000),
      //     		-9:00	NT_YK	Y%sT	1973 Oct 28  0:00
      new ZoneOffset(-32400000, "NT_YK", "Y%sT", 123292800000),
      //     		-8:00	NT_YK	P%sT	1980
      new ZoneOffset(-28800000, "NT_YK", "P%sT", 318211200000),
      //     		-8:00	Canada	P%sT	2020 Nov  1
      new ZoneOffset(-28800000, "Canada", "P%sT", 1606780800000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Cancun",
    new Zone("America/Cancun", [
      // Zone America/Cancun    -5:47:04 -	LMT	1922 Jan  1  0:12:56
      new ZoneOffset(-20824000, "-", "LMT", -1512085680000),
      //     		-6:00	-	CST	1981 Dec 23
      new ZoneOffset(-21600000, "-", "CST", 380592000000),
      //     		-5:00	Mexico	E%sT	1998 Aug  2  2:00
      new ZoneOffset(-18000000, "Mexico", "E%sT", 904701600000),
      //     		-6:00	Mexico	C%sT	2015 Feb  1  2:00
      new ZoneOffset(-21600000, "Mexico", "C%sT", 1425175200000),
      //     		-5:00	-	EST
      new ZoneOffset(-18000000, "-", "EST", -1),
    ])
  );
  zones.set(
    "America/Merida",
    new Zone("America/Merida", [
      // Zone America/Merida    -5:58:28 -	LMT	1922 Jan  1  0:01:32
      new ZoneOffset(-21508000, "-", "LMT", -1512086340000),
      //     		-6:00	-	CST	1981 Dec 23
      new ZoneOffset(-21600000, "-", "CST", 380592000000),
      //     		-5:00	-	EST	1982 Dec  2
      new ZoneOffset(-18000000, "-", "EST", 410313600000),
      //     		-6:00	Mexico	C%sT
      new ZoneOffset(-21600000, "Mexico", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Matamoros",
    new Zone("America/Matamoros", [
      // Zone America/Matamoros    -6:40:00 -	LMT	1921 Dec 31 23:20:00
      new ZoneOffset(-24000000, "-", "LMT", -1512088800000),
      //     		-6:00	-	CST	1988
      new ZoneOffset(-21600000, "-", "CST", 570672000000),
      //     		-6:00	US	C%sT	1989
      new ZoneOffset(-21600000, "US", "C%sT", 602294400000),
      //     		-6:00	Mexico	C%sT	2010
      new ZoneOffset(-21600000, "Mexico", "C%sT", 1264982400000),
      //     		-6:00	US	C%sT
      new ZoneOffset(-21600000, "US", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Monterrey",
    new Zone("America/Monterrey", [
      // Zone America/Monterrey    -6:41:16 -	LMT	1921 Dec 31 23:18:44
      new ZoneOffset(-24076000, "-", "LMT", -1512088920000),
      //     		-6:00	-	CST	1988
      new ZoneOffset(-21600000, "-", "CST", 570672000000),
      //     		-6:00	US	C%sT	1989
      new ZoneOffset(-21600000, "US", "C%sT", 602294400000),
      //     		-6:00	Mexico	C%sT
      new ZoneOffset(-21600000, "Mexico", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Mexico_City",
    new Zone("America/Mexico_City", [
      // Zone America/Mexico_City -6:36:36 -    LMT	1922 Jan  1  0:23:24
      new ZoneOffset(-23796000, "-", "LMT", -1512085020000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	Mexico	C%sT	2001 Sep 30  2:00
      new ZoneOffset(-21600000, "Mexico", "C%sT", 1004407200000),
      //     		-6:00	-	CST	2002 Feb 20
      new ZoneOffset(-21600000, "-", "CST", 1016582400000),
      //     		-6:00	Mexico	C%sT
      new ZoneOffset(-21600000, "Mexico", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Ojinaga",
    new Zone("America/Ojinaga", [
      // Zone America/Ojinaga    -6:57:40 -	LMT	1922 Jan  1  0:02:20
      new ZoneOffset(-25060000, "-", "LMT", -1512086280000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	-	CST	1996
      new ZoneOffset(-21600000, "-", "CST", 823132800000),
      //     		-6:00	Mexico	C%sT	1998
      new ZoneOffset(-21600000, "Mexico", "C%sT", 886291200000),
      //     		-6:00	-	CST	1998 Apr Sun>=1  3:00
      new ZoneOffset(-21600000, "-", "CST", 893980800000),
      //     		-7:00	Mexico	M%sT	2010
      new ZoneOffset(-25200000, "Mexico", "M%sT", 1264982400000),
      //     		-7:00	US	M%sT
      new ZoneOffset(-25200000, "US", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Chihuahua",
    new Zone("America/Chihuahua", [
      // Zone America/Chihuahua    -7:04:20 -	LMT	1921 Dec 31 23:55:40
      new ZoneOffset(-25460000, "-", "LMT", -1512086700000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	-	CST	1996
      new ZoneOffset(-21600000, "-", "CST", 823132800000),
      //     		-6:00	Mexico	C%sT	1998
      new ZoneOffset(-21600000, "Mexico", "C%sT", 886291200000),
      //     		-6:00	-	CST	1998 Apr Sun>=1  3:00
      new ZoneOffset(-21600000, "-", "CST", 893980800000),
      //     		-7:00	Mexico	M%sT
      new ZoneOffset(-25200000, "Mexico", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Hermosillo",
    new Zone("America/Hermosillo", [
      // Zone America/Hermosillo    -7:23:52 -	LMT	1921 Dec 31 23:36:08
      new ZoneOffset(-26632000, "-", "LMT", -1512087840000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	-	CST	1942 Apr 24
      new ZoneOffset(-21600000, "-", "CST", -871257600000),
      //     		-7:00	-	MST	1949 Jan 14
      new ZoneOffset(-25200000, "-", "MST", -658886400000),
      //     		-8:00	-	PST	1970
      new ZoneOffset(-28800000, "-", "PST", 2678400000),
      //     		-7:00	Mexico	M%sT	1999
      new ZoneOffset(-25200000, "Mexico", "M%sT", 917827200000),
      //     		-7:00	-	MST
      new ZoneOffset(-25200000, "-", "MST", -1),
    ])
  );
  zones.set(
    "America/Mazatlan",
    new Zone("America/Mazatlan", [
      // Zone America/Mazatlan    -7:05:40 -	LMT	1921 Dec 31 23:54:20
      new ZoneOffset(-25540000, "-", "LMT", -1512086760000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	-	CST	1942 Apr 24
      new ZoneOffset(-21600000, "-", "CST", -871257600000),
      //     		-7:00	-	MST	1949 Jan 14
      new ZoneOffset(-25200000, "-", "MST", -658886400000),
      //     		-8:00	-	PST	1970
      new ZoneOffset(-28800000, "-", "PST", 2678400000),
      //     		-7:00	Mexico	M%sT
      new ZoneOffset(-25200000, "Mexico", "M%sT", -1),
    ])
  );
  zones.set(
    "America/Bahia_Banderas",
    new Zone("America/Bahia_Banderas", [
      // Zone America/Bahia_Banderas    -7:01:00 -	LMT	1921 Dec 31 23:59:00
      new ZoneOffset(-25260000, "-", "LMT", -1512086460000),
      //     		-7:00	-	MST	1927 Jun 10 23:00
      new ZoneOffset(-25200000, "-", "MST", -1340499600000),
      //     		-6:00	-	CST	1930 Nov 15
      new ZoneOffset(-21600000, "-", "CST", -1232236800000),
      //     		-7:00	-	MST	1931 May  1 23:00
      new ZoneOffset(-25200000, "-", "MST", -1217638800000),
      //     		-6:00	-	CST	1931 Oct
      new ZoneOffset(-21600000, "-", "CST", -1204502400000),
      //     		-7:00	-	MST	1932 Apr  1
      new ZoneOffset(-25200000, "-", "MST", -1188777600000),
      //     		-6:00	-	CST	1942 Apr 24
      new ZoneOffset(-21600000, "-", "CST", -871257600000),
      //     		-7:00	-	MST	1949 Jan 14
      new ZoneOffset(-25200000, "-", "MST", -658886400000),
      //     		-8:00	-	PST	1970
      new ZoneOffset(-28800000, "-", "PST", 2678400000),
      //     		-7:00	Mexico	M%sT	2010 Apr  4  2:00
      new ZoneOffset(-25200000, "Mexico", "M%sT", 1272938400000),
      //     		-6:00	Mexico	C%sT
      new ZoneOffset(-21600000, "Mexico", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Tijuana",
    new Zone("America/Tijuana", [
      // Zone America/Tijuana    -7:48:04 -	LMT	1922 Jan  1  0:11:56
      new ZoneOffset(-28084000, "-", "LMT", -1512085740000),
      //     		-7:00	-	MST	1924
      new ZoneOffset(-25200000, "-", "MST", -1449014400000),
      //     		-8:00	-	PST	1927 Jun 10 23:00
      new ZoneOffset(-28800000, "-", "PST", -1340499600000),
      //     		-7:00	-	MST	1930 Nov 15
      new ZoneOffset(-25200000, "-", "MST", -1232236800000),
      //     		-8:00	-	PST	1931 Apr  1
      new ZoneOffset(-28800000, "-", "PST", -1220400000000),
      //     		-8:00	1:00	PDT	1931 Sep 30
      new ZoneOffset(-28800000, "1:00", "PDT", -1204675200000),
      //     		-8:00	-	PST	1942 Apr 24
      new ZoneOffset(-28800000, "-", "PST", -871257600000),
      //     		-8:00	1:00	PWT	1945 Aug 14 23:00u
      new ZoneOffset(-28800000, "1:00", "PWT", -766717200000),
      //     		-8:00	1:00	PPT	1945 Nov 12 # Peace
      new ZoneOffset(-28800000, "1:00", "PPT", -759110400000),
      //     		-8:00	-	PST	1948 Apr  5
      new ZoneOffset(-28800000, "-", "PST", -683510400000),
      //     		-8:00	1:00	PDT	1949 Jan 14
      new ZoneOffset(-28800000, "1:00", "PDT", -658886400000),
      //     		-8:00	-	PST	1954
      new ZoneOffset(-28800000, "-", "PST", -502243200000),
      //     		-8:00	CA	P%sT	1961
      new ZoneOffset(-28800000, "CA", "P%sT", -281318400000),
      //     		-8:00	-	PST	1976
      new ZoneOffset(-28800000, "-", "PST", 191980800000),
      //     		-8:00	US	P%sT	1996
      new ZoneOffset(-28800000, "US", "P%sT", 823132800000),
      //     		-8:00	Mexico	P%sT	2001
      new ZoneOffset(-28800000, "Mexico", "P%sT", 980985600000),
      //     		-8:00	US	P%sT	2002 Feb 20
      new ZoneOffset(-28800000, "US", "P%sT", 1016582400000),
      //     		-8:00	Mexico	P%sT	2010
      new ZoneOffset(-28800000, "Mexico", "P%sT", 1264982400000),
      //     		-8:00	US	P%sT
      new ZoneOffset(-28800000, "US", "P%sT", -1),
    ])
  );
  zones.set(
    "America/Nassau",
    new Zone("America/Nassau", [
      // Zone    America/Nassau	-5:09:30 -	LMT	1912 Mar 2
      new ZoneOffset(-18570000, "-", "LMT", -1822435200000),
      //     		-5:00	Bahamas	E%sT	1976
      new ZoneOffset(-18000000, "Bahamas", "E%sT", 191980800000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Barbados",
    new Zone("America/Barbados", [
      // Zone America/Barbados    -3:58:29 -	LMT	1924 # Bridgetown
      new ZoneOffset(-14309000, "-", "LMT", -1449014400000),
      //     		-3:58:29 -	BMT	1932 # Bridgetown Mean Time
      new ZoneOffset(-14309000, "-", "BMT", -1196553600000),
      //     		-4:00	Barb	A%sT
      new ZoneOffset(-14400000, "Barb", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Belize",
    new Zone("America/Belize", [
      // Zone    America/Belize	-5:52:48 -	LMT	1912 Apr  1
      new ZoneOffset(-21168000, "-", "LMT", -1819929600000),
      //     		-6:00	Belize	%s
      new ZoneOffset(-21600000, "Belize", "%s", -1),
    ])
  );
  zones.set(
    "Atlantic/Bermuda",
    new Zone("Atlantic/Bermuda", [
      // Zone Atlantic/Bermuda    -4:19:18 -	LMT	1890	# Hamilton
      new ZoneOffset(-15558000, "-", "LMT", -2521843200000),
      //     		-4:19:18 Bermuda BMT/BST 1930 Jan 1  2:00
      new ZoneOffset(-15558000, "Bermuda", "BMT/BST", -1259618400000),
      //     		-4:00	Bermuda	A%sT	1974 Apr 28  2:00
      new ZoneOffset(-14400000, "Bermuda", "A%sT", 138938400000),
      //     		-4:00	Canada	A%sT	1976
      new ZoneOffset(-14400000, "Canada", "A%sT", 191980800000),
      //     		-4:00	US	A%sT
      new ZoneOffset(-14400000, "US", "A%sT", -1),
    ])
  );
  zones.set(
    "America/Costa_Rica",
    new Zone("America/Costa_Rica", [
      // Zone America/Costa_Rica    -5:36:13 -	LMT	1890        # San José
      new ZoneOffset(-20173000, "-", "LMT", -2521843200000),
      //     		-5:36:13 -	SJMT	1921 Jan 15 # San José Mean Time
      new ZoneOffset(-20173000, "-", "SJMT", -1542412800000),
      //     		-6:00	CR	C%sT
      new ZoneOffset(-21600000, "CR", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Havana",
    new Zone("America/Havana", [
      // Zone    America/Havana	-5:29:28 -	LMT	1890
      new ZoneOffset(-19768000, "-", "LMT", -2521843200000),
      //     		-5:29:36 -	HMT	1925 Jul 19 12:00 # Havana MT
      new ZoneOffset(-19776000, "-", "HMT", -1400155200000),
      //     		-5:00	Cuba	C%sT
      new ZoneOffset(-18000000, "Cuba", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Santo_Domingo",
    new Zone("America/Santo_Domingo", [
      // Zone America/Santo_Domingo -4:39:36 -    LMT	1890
      new ZoneOffset(-16776000, "-", "LMT", -2521843200000),
      //     		-4:40	-	SDMT	1933 Apr  1 12:00 # S. Dom. MT
      new ZoneOffset(-16800000, "-", "SDMT", -1157198400000),
      //     		-5:00	DR	%s	1974 Oct 27
      new ZoneOffset(-18000000, "DR", "%s", 154742400000),
      //     		-4:00	-	AST	2000 Oct 29  2:00
      new ZoneOffset(-14400000, "-", "AST", 975463200000),
      //     		-5:00	US	E%sT	2000 Dec  3  1:00
      new ZoneOffset(-18000000, "US", "E%sT", 978483600000),
      //     		-4:00	-	AST
      new ZoneOffset(-14400000, "-", "AST", -1),
    ])
  );
  zones.set(
    "America/El_Salvador",
    new Zone("America/El_Salvador", [
      // Zone America/El_Salvador -5:56:48 -    LMT	1921 # San Salvador
      new ZoneOffset(-21408000, "-", "LMT", -1543622400000),
      //     		-6:00	Salv	C%sT
      new ZoneOffset(-21600000, "Salv", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Guatemala",
    new Zone("America/Guatemala", [
      // Zone America/Guatemala    -6:02:04 -	LMT	1918 Oct 5
      new ZoneOffset(-21724000, "-", "LMT", -1614384000000),
      //     		-6:00	Guat	C%sT
      new ZoneOffset(-21600000, "Guat", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Port-au-Prince",
    new Zone("America/Port-au-Prince", [
      // Zone America/Port-au-Prince -4:49:20 -    LMT	1890
      new ZoneOffset(-17360000, "-", "LMT", -2521843200000),
      //     		-4:49	-	PPMT	1917 Jan 24 12:00 # P-a-P MT
      new ZoneOffset(-17340000, "-", "PPMT", -1667822400000),
      //     		-5:00	Haiti	E%sT
      new ZoneOffset(-18000000, "Haiti", "E%sT", -1),
    ])
  );
  zones.set(
    "America/Tegucigalpa",
    new Zone("America/Tegucigalpa", [
      // Zone America/Tegucigalpa -5:48:52 -    LMT	1921 Apr
      new ZoneOffset(-20932000, "-", "LMT", -1535932800000),
      //     		-6:00	Hond	C%sT
      new ZoneOffset(-21600000, "Hond", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Jamaica",
    new Zone("America/Jamaica", [
      // Zone    America/Jamaica	-5:07:10 -	LMT	1890        # Kingston
      new ZoneOffset(-18430000, "-", "LMT", -2521843200000),
      //     		-5:07:10 -	KMT	1912 Feb    # Kingston Mean Time
      new ZoneOffset(-18430000, "-", "KMT", -1825200000000),
      //     		-5:00	-	EST	1974
      new ZoneOffset(-18000000, "-", "EST", 128908800000),
      //     		-5:00	US	E%sT	1984
      new ZoneOffset(-18000000, "US", "E%sT", 444441600000),
      //     		-5:00	-	EST
      new ZoneOffset(-18000000, "-", "EST", -1),
    ])
  );
  zones.set(
    "America/Martinique",
    new Zone("America/Martinique", [
      // Zone America/Martinique    -4:04:20 -      LMT	1890        # Fort-de-France
      new ZoneOffset(-14660000, "-", "LMT", -2521843200000),
      //     		-4:04:20 -	FFMT	1911 May    # Fort-de-France MT
      new ZoneOffset(-14660000, "-", "FFMT", -1848873600000),
      //     		-4:00	-	AST	1980 Apr  6
      new ZoneOffset(-14400000, "-", "AST", 326419200000),
      //     		-4:00	1:00	ADT	1980 Sep 28
      new ZoneOffset(-14400000, "1:00", "ADT", 341539200000),
      //     		-4:00	-	AST
      new ZoneOffset(-14400000, "-", "AST", -1),
    ])
  );
  zones.set(
    "America/Managua",
    new Zone("America/Managua", [
      // Zone    America/Managua	-5:45:08 -	LMT	1890
      new ZoneOffset(-20708000, "-", "LMT", -2521843200000),
      //     		-5:45:12 -	MMT	1934 Jun 23 # Managua Mean Time?
      new ZoneOffset(-20712000, "-", "MMT", -1118534400000),
      //     		-6:00	-	CST	1973 May
      new ZoneOffset(-21600000, "-", "CST", 107740800000),
      //     		-5:00	-	EST	1975 Feb 16
      new ZoneOffset(-18000000, "-", "EST", 164160000000),
      //     		-6:00	Nic	C%sT	1992 Jan  1  4:00
      new ZoneOffset(-21600000, "Nic", "C%sT", 696916800000),
      //     		-5:00	-	EST	1992 Sep 24
      new ZoneOffset(-18000000, "-", "EST", 719884800000),
      //     		-6:00	-	CST	1993
      new ZoneOffset(-21600000, "-", "CST", 728524800000),
      //     		-5:00	-	EST	1997
      new ZoneOffset(-18000000, "-", "EST", 854755200000),
      //     		-6:00	Nic	C%sT
      new ZoneOffset(-21600000, "Nic", "C%sT", -1),
    ])
  );
  zones.set(
    "America/Panama",
    new Zone("America/Panama", [
      // Zone    America/Panama	-5:18:08 -	LMT	1890
      new ZoneOffset(-19088000, "-", "LMT", -2521843200000),
      //     		-5:19:36 -	CMT	1908 Apr 22 # Colón Mean Time
      new ZoneOffset(-19176000, "-", "CMT", -1944345600000),
      //     		-5:00	-	EST
      new ZoneOffset(-18000000, "-", "EST", -1),
    ])
  );
  zones.set(
    "America/Puerto_Rico",
    new Zone("America/Puerto_Rico", [
      // Zone America/Puerto_Rico -4:24:25 -    LMT	1899 Mar 28 12:00 # San Juan
      new ZoneOffset(-15865000, "-", "LMT", -2230372800000),
      //     		-4:00	-	AST	1942 May  3
      new ZoneOffset(-14400000, "-", "AST", -870393600000),
      //     		-4:00	US	A%sT	1946
      new ZoneOffset(-14400000, "US", "A%sT", -754704000000),
      //     		-4:00	-	AST
      new ZoneOffset(-14400000, "-", "AST", -1),
    ])
  );
  zones.set(
    "America/Miquelon",
    new Zone("America/Miquelon", [
      // Zone America/Miquelon    -3:44:40 -	LMT	1911 May 15 # St Pierre
      new ZoneOffset(-13480000, "-", "LMT", -1847664000000),
      //     		-4:00	-	AST	1980 May
      new ZoneOffset(-14400000, "-", "AST", 328665600000),
      //     		-3:00	-	-03	1987
      new ZoneOffset(-10800000, "-", "-0", -2113862400000),
      //     		-3:00	Canada	-03/-02
      new ZoneOffset(-10800000, "Canada", "-0", -2111702400000),
    ])
  );
  zones.set(
    "America/Grand_Turk",
    new Zone("America/Grand_Turk", [
      // Zone America/Grand_Turk    -4:44:32 -	LMT	1890
      new ZoneOffset(-17072000, "-", "LMT", -2521843200000),
      //     		-5:07:10 -	KMT	1912 Feb # Kingston Mean Time
      new ZoneOffset(-18430000, "-", "KMT", -1825200000000),
      //     		-5:00	-	EST	1979
      new ZoneOffset(-18000000, "-", "EST", 286675200000),
      //     		-5:00	US	E%sT	2015 Mar  8  2:00
      new ZoneOffset(-18000000, "US", "E%sT", 1428458400000),
      //     		-4:00	-	AST	2018 Mar 11  3:00
      new ZoneOffset(-14400000, "-", "AST", 1523415600000),
      //     		-5:00	US	E%sT
      new ZoneOffset(-18000000, "US", "E%sT", -1),
    ])
  );
  zones.set(
    "Europe/London",
    new Zone("Europe/London", [
      // Zone    Europe/London	-0:01:15 -	LMT	1847 Dec  1  0:00s
      new ZoneOffset(-75000, "-", "LMT", -3849984000000),
      //     		 0:00	GB-Eire	%s	1968 Oct 27
      new ZoneOffset(0, "GB-Eire", "%s", -34560000000),
      //     		 1:00	-	BST	1971 Oct 31  2:00u
      new ZoneOffset(3600000, "-", "BST", 60400800000),
      //     		 0:00	GB-Eire	%s	1996
      new ZoneOffset(0, "GB-Eire", "%s", 823132800000),
      //     		 0:00	EU	GMT/BST
      new ZoneOffset(0, "EU", "GMT/BST", -1),
    ])
  );
  zones.set(
    "Europe/Dublin",
    new Zone("Europe/Dublin", [
      // Zone    Europe/Dublin	-0:25:00 -	LMT	1880 Aug  2
      new ZoneOffset(-1500000, "-", "LMT", -2818972800000),
      //     		-0:25:21 -	DMT	1916 May 21  2:00s
      new ZoneOffset(-1521000, "-", "DMT", -1689285600000),
      //     		-0:25:21 1:00	IST	1916 Oct  1  2:00s
      new ZoneOffset(-1521000, "1:00", "IST", -1677794400000),
      //     		 0:00	GB-Eire	%s	1921 Dec  6 # independence
      new ZoneOffset(0, "GB-Eire", "%s", -1514332800000),
      //     		 0:00	GB-Eire	GMT/IST	1940 Feb 25  2:00s
      new ZoneOffset(0, "GB-Eire", "GMT/IST", -939506400000),
      //     		 0:00	1:00	IST	1946 Oct  6  2:00s
      new ZoneOffset(0, "1:00", "IST", -730677600000),
      //     		 0:00	-	GMT	1947 Mar 16  2:00s
      new ZoneOffset(0, "-", "GMT", -716767200000),
      //     		 0:00	1:00	IST	1947 Nov  2  2:00s
      new ZoneOffset(0, "1:00", "IST", -696895200000),
      //     		 0:00	-	GMT	1948 Apr 18  2:00s
      new ZoneOffset(0, "-", "GMT", -682380000000),
      //     		 0:00	GB-Eire	GMT/IST	1968 Oct 27
      new ZoneOffset(0, "GB-Eire", "GMT/IST", -34560000000),
      //     		 1:00	Eire	IST/GMT
      new ZoneOffset(3600000, "Eire", "IST/GMT", -1),
    ])
  );
  zones.set(
    "WET",
    new Zone("WET", [
      // Zone    WET		0:00	EU	WE%sT
      new ZoneOffset(0, "EU", "WE%sT", -1),
      // Zone    CET		1:00	C-Eur	CE%sT
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1),
    ])
  );
  zones.set(
    "MET",
    new Zone("MET", [
      // Zone    MET		1:00	C-Eur	ME%sT
      new ZoneOffset(3600000, "C-Eur", "ME%sT", -1),
      // Zone    EET		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Tirane",
    new Zone("Europe/Tirane", [
      // Zone    Europe/Tirane	1:19:20 -	LMT	1914
      new ZoneOffset(4760000, "-", "LMT", -1764547200000),
      //     		1:00	-	CET	1940 Jun 16
      new ZoneOffset(3600000, "-", "CET", -929750400000),
      //     		1:00	Albania	CE%sT	1984 Jul
      new ZoneOffset(3600000, "Albania", "CE%sT", 460166400000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Andorra",
    new Zone("Europe/Andorra", [
      // Zone    Europe/Andorra	0:06:04 -	LMT	1901
      new ZoneOffset(364000, "-", "LMT", -2174774400000),
      //     		0:00	-	WET	1946 Sep 30
      new ZoneOffset(0, "-", "WET", -731289600000),
      //     		1:00	-	CET	1985 Mar 31  2:00
      new ZoneOffset(3600000, "-", "CET", 483760800000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Vienna",
    new Zone("Europe/Vienna", [
      // Zone    Europe/Vienna	1:05:21 -	LMT	1893 Apr
      new ZoneOffset(3921000, "-", "LMT", -2419459200000),
      //     		1:00	C-Eur	CE%sT	1920
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1575244800000),
      //     		1:00	Austria	CE%sT	1940 Apr  1  2:00s
      new ZoneOffset(3600000, "Austria", "CE%sT", -936309600000),
      //     		1:00	C-Eur	CE%sT	1945 Apr  2  2:00s
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -778456800000),
      //     		1:00	1:00	CEST	1945 Apr 12  2:00s
      new ZoneOffset(3600000, "1:00", "CEST", -777592800000),
      //     		1:00	-	CET	1946
      new ZoneOffset(3600000, "-", "CET", -754704000000),
      //     		1:00	Austria	CE%sT	1981
      new ZoneOffset(3600000, "Austria", "CE%sT", 349833600000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Minsk",
    new Zone("Europe/Minsk", [
      // Zone    Europe/Minsk	1:50:16 -	LMT	1880
      new ZoneOffset(6616000, "-", "LMT", -2837462400000),
      //     		1:50	-	MMT	1924 May  2 # Minsk Mean Time
      new ZoneOffset(6600000, "-", "MMT", -1438473600000),
      //     		2:00	-	EET	1930 Jun 21
      new ZoneOffset(7200000, "-", "EET", -1244937600000),
      //     		3:00	-	MSK	1941 Jun 28
      new ZoneOffset(10800000, "-", "MSK", -897177600000),
      //     		1:00	C-Eur	CE%sT	1944 Jul  3
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -801964800000),
      //     		3:00	Russia	MSK/MSD	1990
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 633830400000),
      //     		3:00	-	MSK	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "-", "MSK", 673063200000),
      //     		2:00	Russia	EE%sT	2011 Mar 27  2:00s
      new ZoneOffset(7200000, "Russia", "EE%sT", 1303869600000),
      //     		3:00	-	+03
      new ZoneOffset(10800000, "-", "+0", -2111702400000),
    ])
  );
  zones.set(
    "Europe/Brussels",
    new Zone("Europe/Brussels", [
      // Zone    Europe/Brussels	0:17:30 -	LMT	1880
      new ZoneOffset(1050000, "-", "LMT", -2837462400000),
      //     		0:17:30	-	BMT	1892 May  1 00:17:30
      new ZoneOffset(1050000, "-", "BMT", -2448315780000),
      //     		0:00	-	WET	1914 Nov  8
      new ZoneOffset(0, "-", "WET", -1737763200000),
      //     		1:00	-	CET	1916 May  1  0:00
      new ZoneOffset(3600000, "-", "CET", -1691020800000),
      //     		1:00	C-Eur	CE%sT	1918 Nov 11 11:00u
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1611234000000),
      //     		0:00	Belgium	WE%sT	1940 May 20  2:00s
      new ZoneOffset(0, "Belgium", "WE%sT", -931989600000),
      //     		1:00	C-Eur	CE%sT	1944 Sep  3
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -796694400000),
      //     		1:00	Belgium	CE%sT	1977
      new ZoneOffset(3600000, "Belgium", "CE%sT", 223603200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Sofia",
    new Zone("Europe/Sofia", [
      // Zone    Europe/Sofia	1:33:16 -	LMT	1880
      new ZoneOffset(5596000, "-", "LMT", -2837462400000),
      //     		1:56:56	-	IMT	1894 Nov 30 # Istanbul MT?
      new ZoneOffset(7016000, "-", "IMT", -2366928000000),
      //     		2:00	-	EET	1942 Nov  2  3:00
      new ZoneOffset(7200000, "-", "EET", -854658000000),
      //     		1:00	C-Eur	CE%sT	1945
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -786240000000),
      //     		1:00	-	CET	1945 Apr  2  3:00
      new ZoneOffset(3600000, "-", "CET", -778453200000),
      //     		2:00	-	EET	1979 Mar 31 23:00
      new ZoneOffset(7200000, "-", "EET", 294447600000),
      //     		2:00	Bulg	EE%sT	1982 Sep 26  3:00
      new ZoneOffset(7200000, "Bulg", "EE%sT", 404449200000),
      //     		2:00	C-Eur	EE%sT	1991
      new ZoneOffset(7200000, "C-Eur", "EE%sT", 665366400000),
      //     		2:00	E-Eur	EE%sT	1997
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 854755200000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Prague",
    new Zone("Europe/Prague", [
      // Zone    Europe/Prague	0:57:44 -	LMT	1850
      new ZoneOffset(3464000, "-", "LMT", -3784147200000),
      //     		0:57:44	-	PMT	1891 Oct    # Prague Mean Time
      new ZoneOffset(3464000, "-", "PMT", -2466720000000),
      //     		1:00	C-Eur	CE%sT	1945 May  9
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -775180800000),
      //     		1:00	Czech	CE%sT	1946 Dec  1  3:00
      new ZoneOffset(3600000, "Czech", "CE%sT", -725835600000),
      //     		1:00	-1:00	GMT	1947 Feb 23  2:00
      new ZoneOffset(3600000, "-1:00", "GMT", -718840800000),
      //     		1:00	Czech	CE%sT	1979
      new ZoneOffset(3600000, "Czech", "CE%sT", 286675200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Copenhagen",
    new Zone("Europe/Copenhagen", [
      // Zone Europe/Copenhagen     0:50:20 -	LMT	1890
      new ZoneOffset(3020000, "-", "LMT", -2521843200000),
      //     		 0:50:20 -	CMT	1894 Jan  1 # Copenhagen MT
      new ZoneOffset(3020000, "-", "CMT", -2395612800000),
      //     		 1:00	Denmark	CE%sT	1942 Nov  2  2:00s
      new ZoneOffset(3600000, "Denmark", "CE%sT", -854661600000),
      //     		 1:00	C-Eur	CE%sT	1945 Apr  2  2:00
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -778456800000),
      //     		 1:00	Denmark	CE%sT	1980
      new ZoneOffset(3600000, "Denmark", "CE%sT", 318211200000),
      //     		 1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Atlantic/Faroe",
    new Zone("Atlantic/Faroe", [
      // Zone Atlantic/Faroe    -0:27:04 -	LMT	1908 Jan 11 # Tórshavn
      new ZoneOffset(-1624000, "-", "LMT", -1953072000000),
      //     		 0:00	-	WET	1981
      new ZoneOffset(0, "-", "WET", 349833600000),
      //     		 0:00	EU	WE%sT
      new ZoneOffset(0, "EU", "WE%sT", -1),
    ])
  );
  zones.set(
    "America/Danmarkshavn",
    new Zone("America/Danmarkshavn", [
      // Zone America/Danmarkshavn -1:14:40 -    LMT	1916 Jul 28
      new ZoneOffset(-4480000, "-", "LMT", -1683417600000),
      //     		-3:00	-	-03	1980 Apr  6  2:00
      new ZoneOffset(-10800000, "-", "-0", -2114467200000),
      //     		-3:00	EU	-03/-02	1996
      new ZoneOffset(-10800000, "EU", "-0", -2111702400000),
      //     		0:00	-	GMT
      new ZoneOffset(0, "-", "GMT", -1),
    ])
  );
  zones.set(
    "America/Scoresbysund",
    new Zone("America/Scoresbysund", [
      // Zone America/Scoresbysund -1:27:52 -    LMT	1916 Jul 28 # Ittoqqortoormiit
      new ZoneOffset(-5272000, "-", "LMT", -1683417600000),
      //     		-2:00	-	-02	1980 Apr  6  2:00
      new ZoneOffset(-7200000, "-", "-0", -2146003200000),
      //     		-2:00	C-Eur	-02/-01	1981 Mar 29
      new ZoneOffset(-7200000, "C-Eur", "-0", -2143238400000),
      //     		-1:00	EU	-01/+00
      new ZoneOffset(-3600000, "EU", "-0", -2174774400000),
      // Zone America/Nuuk    -3:26:56 -	LMT	1916 Jul 28 # Godthåb
      new ZoneOffset(-12416000, "-", "LMT", -1683417600000),
      //     		-3:00	-	-03	1980 Apr  6  2:00
      new ZoneOffset(-10800000, "-", "-0", -2114467200000),
      //     		-3:00	EU	-03/-02
      new ZoneOffset(-10800000, "EU", "-0", -2111702400000),
      // Zone America/Thule    -4:35:08 -	LMT	1916 Jul 28 # Pituffik
      new ZoneOffset(-16508000, "-", "LMT", -1683417600000),
      //     		-4:00	Thule	A%sT
      new ZoneOffset(-14400000, "Thule", "A%sT", -1),
    ])
  );
  zones.set(
    "Europe/Tallinn",
    new Zone("Europe/Tallinn", [
      // Zone    Europe/Tallinn	1:39:00	-	LMT	1880
      new ZoneOffset(5940000, "-", "LMT", -2837462400000),
      //     		1:39:00	-	TMT	1918 Feb    # Tallinn Mean Time
      new ZoneOffset(5940000, "-", "TMT", -1635897600000),
      //     		1:00	C-Eur	CE%sT	1919 Jul
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1591142400000),
      //     		1:39:00	-	TMT	1921 May
      new ZoneOffset(5940000, "-", "TMT", -1533254400000),
      //     		2:00	-	EET	1940 Aug  6
      new ZoneOffset(7200000, "-", "EET", -925257600000),
      //     		3:00	-	MSK	1941 Sep 15
      new ZoneOffset(10800000, "-", "MSK", -890352000000),
      //     		1:00	C-Eur	CE%sT	1944 Sep 22
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -795052800000),
      //     		3:00	Russia	MSK/MSD	1989 Mar 26  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 609559200000),
      //     		2:00	1:00	EEST	1989 Sep 24  2:00s
      new ZoneOffset(7200000, "1:00", "EEST", 625197600000),
      //     		2:00	C-Eur	EE%sT	1998 Sep 22
      new ZoneOffset(7200000, "C-Eur", "EE%sT", 909014400000),
      //     		2:00	EU	EE%sT	1999 Oct 31  4:00
      new ZoneOffset(7200000, "EU", "EE%sT", 944020800000),
      //     		2:00	-	EET	2002 Feb 21
      new ZoneOffset(7200000, "-", "EET", 1016668800000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Helsinki",
    new Zone("Europe/Helsinki", [
      // Zone    Europe/Helsinki	1:39:49 -	LMT	1878 May 31
      new ZoneOffset(5989000, "-", "LMT", -2887574400000),
      //     		1:39:49	-	HMT	1921 May    # Helsinki Mean Time
      new ZoneOffset(5989000, "-", "HMT", -1533254400000),
      //     		2:00	Finland	EE%sT	1983
      new ZoneOffset(7200000, "Finland", "EE%sT", 412905600000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Paris",
    new Zone("Europe/Paris", [
      // Zone    Europe/Paris	0:09:21 -	LMT	1891 Mar 16
      new ZoneOffset(561000, "-", "LMT", -2483913600000),
      //     		0:09:21	-	PMT	1911 Mar 11 # Paris Mean Time
      new ZoneOffset(561000, "-", "PMT", -1853280000000),
      //     		0:00	France	WE%sT	1940 Jun 14 23:00
      new ZoneOffset(0, "France", "WE%sT", -929840400000),
      //     		1:00	C-Eur	CE%sT	1944 Aug 25
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -797385600000),
      //     		0:00	France	WE%sT	1945 Sep 16  3:00
      new ZoneOffset(0, "France", "WE%sT", -764024400000),
      //     		1:00	France	CE%sT	1977
      new ZoneOffset(3600000, "France", "CE%sT", 223603200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Berlin",
    new Zone("Europe/Berlin", [
      // Zone    Europe/Berlin	0:53:28 -	LMT	1893 Apr
      new ZoneOffset(3208000, "-", "LMT", -2419459200000),
      //     		1:00	C-Eur	CE%sT	1945 May 24  2:00
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -773877600000),
      //     		1:00 SovietZone	CE%sT	1946
      new ZoneOffset(3600000, "SovietZone", "CE%sT", -754704000000),
      //     		1:00	Germany	CE%sT	1980
      new ZoneOffset(3600000, "Germany", "CE%sT", 318211200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Gibraltar",
    new Zone("Europe/Gibraltar", [
      // Zone Europe/Gibraltar    -0:21:24 -	LMT	1880 Aug  2  0:00s
      new ZoneOffset(-1284000, "-", "LMT", -2818972800000),
      //     		0:00	GB-Eire	%s	1957 Apr 14  2:00
      new ZoneOffset(0, "GB-Eire", "%s", -398728800000),
      //     		1:00	-	CET	1982
      new ZoneOffset(3600000, "-", "CET", 381369600000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Athens",
    new Zone("Europe/Athens", [
      // Zone    Europe/Athens	1:34:52 -	LMT	1895 Sep 14
      new ZoneOffset(5692000, "-", "LMT", -2342044800000),
      //     		1:34:52	-	AMT	1916 Jul 28  0:01 # Athens MT
      new ZoneOffset(5692000, "-", "AMT", -1683417540000),
      //     		2:00	Greece	EE%sT	1941 Apr 30
      new ZoneOffset(7200000, "Greece", "EE%sT", -902275200000),
      //     		1:00	Greece	CE%sT	1944 Apr  4
      new ZoneOffset(3600000, "Greece", "CE%sT", -809827200000),
      //     		2:00	Greece	EE%sT	1981
      new ZoneOffset(7200000, "Greece", "EE%sT", 349833600000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Budapest",
    new Zone("Europe/Budapest", [
      // Zone    Europe/Budapest	1:16:20 -	LMT	1890 Nov  1
      new ZoneOffset(4580000, "-", "LMT", -2495664000000),
      //     		1:00	C-Eur	CE%sT	1918
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1638316800000),
      //     		1:00	Hungary	CE%sT	1941 Apr  7 23:00
      new ZoneOffset(3600000, "Hungary", "CE%sT", -904179600000),
      //     		1:00	C-Eur	CE%sT	1945
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -786240000000),
      //     		1:00	Hungary	CE%sT	1984
      new ZoneOffset(3600000, "Hungary", "CE%sT", 444441600000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Atlantic/Reykjavik",
    new Zone("Atlantic/Reykjavik", [
      // Zone Atlantic/Reykjavik    -1:28	-	LMT	1908
      new ZoneOffset(-5280000, "-", "LMT", -1953936000000),
      //     		-1:00	Iceland	-01/+00	1968 Apr  7  1:00s
      new ZoneOffset(-3600000, "Iceland", "-0", -2174774400000),
      //     		 0:00	-	GMT
      new ZoneOffset(0, "-", "GMT", -1),
    ])
  );
  zones.set(
    "Europe/Rome",
    new Zone("Europe/Rome", [
      // Zone    Europe/Rome	0:49:56 -	LMT	1866 Dec 12
      new ZoneOffset(2996000, "-", "LMT", -3249417600000),
      //     		0:49:56	-	RMT	1893 Oct 31 23:49:56 # Rome Mean
      new ZoneOffset(2996000, "-", "RMT", -2400883860000),
      //     		1:00	Italy	CE%sT	1943 Sep 10
      new ZoneOffset(3600000, "Italy", "CE%sT", -827712000000),
      //     		1:00	C-Eur	CE%sT	1944 Jun  4
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -804556800000),
      //     		1:00	Italy	CE%sT	1980
      new ZoneOffset(3600000, "Italy", "CE%sT", 318211200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Riga",
    new Zone("Europe/Riga", [
      // Zone    Europe/Riga	1:36:34	-	LMT	1880
      new ZoneOffset(5794000, "-", "LMT", -2837462400000),
      //     		1:36:34	-	RMT	1918 Apr 15  2:00 # Riga MT
      new ZoneOffset(5794000, "-", "RMT", -1629410400000),
      //     		1:36:34	1:00	LST	1918 Sep 16  3:00 # Latvian ST
      new ZoneOffset(5794000, "1:00", "LST", -1616101200000),
      //     		1:36:34	-	RMT	1919 Apr  1  2:00
      new ZoneOffset(5794000, "-", "RMT", -1599084000000),
      //     		1:36:34	1:00	LST	1919 May 22  3:00
      new ZoneOffset(5794000, "1:00", "LST", -1594587600000),
      //     		1:36:34	-	RMT	1926 May 11
      new ZoneOffset(5794000, "-", "RMT", -1374624000000),
      //     		2:00	-	EET	1940 Aug  5
      new ZoneOffset(7200000, "-", "EET", -925344000000),
      //     		3:00	-	MSK	1941 Jul
      new ZoneOffset(10800000, "-", "MSK", -896832000000),
      //     		1:00	C-Eur	CE%sT	1944 Oct 13
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -793152000000),
      //     		3:00	Russia	MSK/MSD	1989 Mar lastSun  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 607392000000),
      //     		2:00	1:00	EEST	1989 Sep lastSun  2:00s
      new ZoneOffset(7200000, "1:00", "EEST", 623203200000),
      //     		2:00	Latvia	EE%sT	1997 Jan 21
      new ZoneOffset(7200000, "Latvia", "EE%sT", 856483200000),
      //     		2:00	EU	EE%sT	2000 Feb 29
      new ZoneOffset(7200000, "EU", "EE%sT", 954288000000),
      //     		2:00	-	EET	2001 Jan  2
      new ZoneOffset(7200000, "-", "EET", 981072000000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Vilnius",
    new Zone("Europe/Vilnius", [
      // Zone    Europe/Vilnius	1:41:16	-	LMT	1880
      new ZoneOffset(6076000, "-", "LMT", -2837462400000),
      //     		1:24:00	-	WMT	1917        # Warsaw Mean Time
      new ZoneOffset(5040000, "-", "WMT", -1669852800000),
      //     		1:35:36	-	KMT	1919 Oct 10 # Kaunas Mean Time
      new ZoneOffset(5736000, "-", "KMT", -1582416000000),
      //     		1:00	-	CET	1920 Jul 12
      new ZoneOffset(3600000, "-", "CET", -1558569600000),
      //     		2:00	-	EET	1920 Oct  9
      new ZoneOffset(7200000, "-", "EET", -1550880000000),
      //     		1:00	-	CET	1940 Aug  3
      new ZoneOffset(3600000, "-", "CET", -925516800000),
      //     		3:00	-	MSK	1941 Jun 24
      new ZoneOffset(10800000, "-", "MSK", -897523200000),
      //     		1:00	C-Eur	CE%sT	1944 Aug
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -799459200000),
      //     		3:00	Russia	MSK/MSD	1989 Mar 26  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 609559200000),
      //     		2:00	Russia	EE%sT	1991 Sep 29  2:00s
      new ZoneOffset(7200000, "Russia", "EE%sT", 688701600000),
      //     		2:00	C-Eur	EE%sT	1998
      new ZoneOffset(7200000, "C-Eur", "EE%sT", 886291200000),
      //     		2:00	-	EET	1998 Mar 29  1:00u
      new ZoneOffset(7200000, "-", "EET", 893811600000),
      //     		1:00	EU	CE%sT	1999 Oct 31  1:00u
      new ZoneOffset(3600000, "EU", "CE%sT", 944010000000),
      //     		2:00	-	EET	2003 Jan  1
      new ZoneOffset(7200000, "-", "EET", 1044057600000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Luxembourg",
    new Zone("Europe/Luxembourg", [
      // Zone Europe/Luxembourg    0:24:36 -	LMT	1904 Jun
      new ZoneOffset(1476000, "-", "LMT", -2067120000000),
      //     		1:00	Lux	CE%sT	1918 Nov 25
      new ZoneOffset(3600000, "Lux", "CE%sT", -1610064000000),
      //     		0:00	Lux	WE%sT	1929 Oct  6  2:00s
      new ZoneOffset(0, "Lux", "WE%sT", -1267135200000),
      //     		0:00	Belgium	WE%sT	1940 May 14  3:00
      new ZoneOffset(0, "Belgium", "WE%sT", -932504400000),
      //     		1:00	C-Eur	WE%sT	1944 Sep 18  3:00
      new ZoneOffset(3600000, "C-Eur", "WE%sT", -795387600000),
      //     		1:00	Belgium	CE%sT	1977
      new ZoneOffset(3600000, "Belgium", "CE%sT", 223603200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Malta",
    new Zone("Europe/Malta", [
      // Zone    Europe/Malta	0:58:04 -	LMT	1893 Nov  2  0:00s # Valletta
      new ZoneOffset(3484000, "-", "LMT", -2400883200000),
      //     		1:00	Italy	CE%sT	1973 Mar 31
      new ZoneOffset(3600000, "Italy", "CE%sT", 105062400000),
      //     		1:00	Malta	CE%sT	1981
      new ZoneOffset(3600000, "Malta", "CE%sT", 349833600000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Chisinau",
    new Zone("Europe/Chisinau", [
      // Zone    Europe/Chisinau	1:55:20 -	LMT	1880
      new ZoneOffset(6920000, "-", "LMT", -2837462400000),
      //     		1:55	-	CMT	1918 Feb 15 # Chisinau MT
      new ZoneOffset(6900000, "-", "CMT", -1634688000000),
      //     		1:44:24	-	BMT	1931 Jul 24 # Bucharest MT
      new ZoneOffset(6264000, "-", "BMT", -1210464000000),
      //     		2:00	Romania	EE%sT	1940 Aug 15
      new ZoneOffset(7200000, "Romania", "EE%sT", -924480000000),
      //     		2:00	1:00	EEST	1941 Jul 17
      new ZoneOffset(7200000, "1:00", "EEST", -895449600000),
      //     		1:00	C-Eur	CE%sT	1944 Aug 24
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -797472000000),
      //     		3:00	Russia	MSK/MSD	1990 May  6  2:00
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 644637600000),
      //     		2:00	Russia	EE%sT	1992
      new ZoneOffset(7200000, "Russia", "EE%sT", 696902400000),
      //     		2:00	E-Eur	EE%sT	1997
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 854755200000),
      //     		2:00	Moldova	EE%sT
      new ZoneOffset(7200000, "Moldova", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Monaco",
    new Zone("Europe/Monaco", [
      // Zone    Europe/Monaco	0:29:32 -	LMT	1892 Jun  1
      new ZoneOffset(1772000, "-", "LMT", -2445724800000),
      //     		0:09:21	-	PMT	1911 Mar 29 # Paris Mean Time
      new ZoneOffset(561000, "-", "PMT", -1851724800000),
      //     		0:00	France	WE%sT	1945 Sep 16  3:00
      new ZoneOffset(0, "France", "WE%sT", -764024400000),
      //     		1:00	France	CE%sT	1977
      new ZoneOffset(3600000, "France", "CE%sT", 223603200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Amsterdam",
    new Zone("Europe/Amsterdam", [
      // Zone Europe/Amsterdam    0:19:32 -	LMT	1835
      new ZoneOffset(1172000, "-", "LMT", -4257532800000),
      //     		0:19:32	Neth	%s	1937 Jul  1
      new ZoneOffset(1172000, "Neth", "%s", -1023062400000),
      //     		0:20	Neth +0020/+0120 1940 May 16  0:00
      new ZoneOffset(1200000, "Neth", "+00", -1575244800000),
      //     		1:00	C-Eur	CE%sT	1945 Apr  2  2:00
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -778456800000),
      //     		1:00	Neth	CE%sT	1977
      new ZoneOffset(3600000, "Neth", "CE%sT", 223603200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Oslo",
    new Zone("Europe/Oslo", [
      // Zone    Europe/Oslo	0:43:00 -	LMT	1895 Jan  1
      new ZoneOffset(2580000, "-", "LMT", -2364076800000),
      //     		1:00	Norway	CE%sT	1940 Aug 10 23:00
      new ZoneOffset(3600000, "Norway", "CE%sT", -924829200000),
      //     		1:00	C-Eur	CE%sT	1945 Apr  2  2:00
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -778456800000),
      //     		1:00	Norway	CE%sT	1980
      new ZoneOffset(3600000, "Norway", "CE%sT", 318211200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Warsaw",
    new Zone("Europe/Warsaw", [
      // Zone    Europe/Warsaw	1:24:00 -	LMT	1880
      new ZoneOffset(5040000, "-", "LMT", -2837462400000),
      //     		1:24:00	-	WMT	1915 Aug  5 # Warsaw Mean Time
      new ZoneOffset(5040000, "-", "WMT", -1714348800000),
      //     		1:00	C-Eur	CE%sT	1918 Sep 16  3:00
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -1616101200000),
      //     		2:00	Poland	EE%sT	1922 Jun
      new ZoneOffset(7200000, "Poland", "EE%sT", -1499126400000),
      //     		1:00	Poland	CE%sT	1940 Jun 23  2:00
      new ZoneOffset(3600000, "Poland", "CE%sT", -929138400000),
      //     		1:00	C-Eur	CE%sT	1944 Oct
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -794188800000),
      //     		1:00	Poland	CE%sT	1977
      new ZoneOffset(3600000, "Poland", "CE%sT", 223603200000),
      //     		1:00	W-Eur	CE%sT	1988
      new ZoneOffset(3600000, "W-Eur", "CE%sT", 570672000000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Lisbon",
    new Zone("Europe/Lisbon", [
      // Zone    Europe/Lisbon	-0:36:45 -	LMT	1884
      new ZoneOffset(-2205000, "-", "LMT", -2711232000000),
      //     		-0:36:45 -	LMT	1912 Jan  1  0:00u # Lisbon MT
      new ZoneOffset(-2205000, "-", "LMT", -1827705600000),
      //     		 0:00	Port	WE%sT	1966 Apr  3  2:00
      new ZoneOffset(0, "Port", "WE%sT", -115682400000),
      //     		 1:00	-	CET	1976 Sep 26  1:00
      new ZoneOffset(3600000, "-", "CET", 215139600000),
      //     		 0:00	Port	WE%sT	1983 Sep 25  1:00s
      new ZoneOffset(0, "Port", "WE%sT", 435891600000),
      //     		 0:00	W-Eur	WE%sT	1992 Sep 27  1:00s
      new ZoneOffset(0, "W-Eur", "WE%sT", 720147600000),
      //     		 1:00	EU	CE%sT	1996 Mar 31  1:00u
      new ZoneOffset(3600000, "EU", "CE%sT", 830912400000),
      //     		 0:00	EU	WE%sT
      new ZoneOffset(0, "EU", "WE%sT", -1),
    ])
  );
  zones.set(
    "Atlantic/Azores",
    new Zone("Atlantic/Azores", [
      // Zone Atlantic/Azores    -1:42:40 -	LMT	1884        # Ponta Delgada
      new ZoneOffset(-6160000, "-", "LMT", -2711232000000),
      //     		-1:54:32 -	HMT	1912 Jan  1  2:00u # Horta MT
      new ZoneOffset(-6872000, "-", "HMT", -1827698400000),
      //     		-2:00	Port	-02/-01	1942 Apr 25 22:00s
      new ZoneOffset(-7200000, "Port", "-0", -2143238400000),
      //     		-2:00	Port	+00	1942 Aug 15 22:00s
      new ZoneOffset(-7200000, "Port", "+00", -861328800000),
      //     		-2:00	Port	-02/-01	1943 Apr 17 22:00s
      new ZoneOffset(-7200000, "Port", "-0", -2143238400000),
      //     		-2:00	Port	+00	1943 Aug 28 22:00s
      new ZoneOffset(-7200000, "Port", "+00", -828669600000),
      //     		-2:00	Port	-02/-01	1944 Apr 22 22:00s
      new ZoneOffset(-7200000, "Port", "-0", -2143238400000),
      //     		-2:00	Port	+00	1944 Aug 26 22:00s
      new ZoneOffset(-7200000, "Port", "+00", -797220000000),
      //     		-2:00	Port	-02/-01	1945 Apr 21 22:00s
      new ZoneOffset(-7200000, "Port", "-0", -2143238400000),
      //     		-2:00	Port	+00	1945 Aug 25 22:00s
      new ZoneOffset(-7200000, "Port", "+00", -765770400000),
      //     		-2:00	Port	-02/-01	1966 Apr  3  2:00
      new ZoneOffset(-7200000, "Port", "-0", -2143238400000),
      //     		-1:00	Port	-01/+00	1983 Sep 25  1:00s
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		-1:00	W-Eur	-01/+00	1992 Sep 27  1:00s
      new ZoneOffset(-3600000, "W-Eur", "-0", -2174774400000),
      //     		 0:00	EU	WE%sT	1993 Mar 28  1:00u
      new ZoneOffset(0, "EU", "WE%sT", 735958800000),
      //     		-1:00	EU	-01/+00
      new ZoneOffset(-3600000, "EU", "-0", -2174774400000),
      // Zone Atlantic/Madeira    -1:07:36 -	LMT	1884        # Funchal
      new ZoneOffset(-4056000, "-", "LMT", -2711232000000),
      //     		-1:07:36 -	FMT	1912 Jan  1  1:00u # Funchal MT
      new ZoneOffset(-4056000, "-", "FMT", -1827702000000),
      //     		-1:00	Port	-01/+00	1942 Apr 25 22:00s
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		-1:00	Port	+01	1942 Aug 15 22:00s
      new ZoneOffset(-3600000, "Port", "+0", -2177366400000),
      //     		-1:00	Port	-01/+00	1943 Apr 17 22:00s
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		-1:00	Port	+01	1943 Aug 28 22:00s
      new ZoneOffset(-3600000, "Port", "+0", -2177280000000),
      //     		-1:00	Port	-01/+00	1944 Apr 22 22:00s
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		-1:00	Port	+01	1944 Aug 26 22:00s
      new ZoneOffset(-3600000, "Port", "+0", -2177193600000),
      //     		-1:00	Port	-01/+00	1945 Apr 21 22:00s
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		-1:00	Port	+01	1945 Aug 25 22:00s
      new ZoneOffset(-3600000, "Port", "+0", -2177107200000),
      //     		-1:00	Port	-01/+00	1966 Apr  3  2:00
      new ZoneOffset(-3600000, "Port", "-0", -2174774400000),
      //     		 0:00	Port	WE%sT	1983 Sep 25  1:00s
      new ZoneOffset(0, "Port", "WE%sT", 435891600000),
      //     		 0:00	EU	WE%sT
      new ZoneOffset(0, "EU", "WE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Bucharest",
    new Zone("Europe/Bucharest", [
      // Zone Europe/Bucharest    1:44:24 -	LMT	1891 Oct
      new ZoneOffset(6264000, "-", "LMT", -2466720000000),
      //     		1:44:24	-	BMT	1931 Jul 24 # Bucharest MT
      new ZoneOffset(6264000, "-", "BMT", -1210464000000),
      //     		2:00	Romania	EE%sT	1981 Mar 29  2:00s
      new ZoneOffset(7200000, "Romania", "EE%sT", 357357600000),
      //     		2:00	C-Eur	EE%sT	1991
      new ZoneOffset(7200000, "C-Eur", "EE%sT", 665366400000),
      //     		2:00	Romania	EE%sT	1994
      new ZoneOffset(7200000, "Romania", "EE%sT", 760060800000),
      //     		2:00	E-Eur	EE%sT	1997
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 854755200000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Kaliningrad",
    new Zone("Europe/Kaliningrad", [
      // Zone Europe/Kaliningrad     1:22:00 -	LMT	1893 Apr
      new ZoneOffset(4920000, "-", "LMT", -2419459200000),
      //     		 1:00	C-Eur	CE%sT	1945 Apr 10
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -777772800000),
      //     		 2:00	Poland	EE%sT	1946 Apr  7
      new ZoneOffset(7200000, "Poland", "EE%sT", -746496000000),
      //     		 3:00	Russia	MSK/MSD	1989 Mar 26  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 609559200000),
      //     		 2:00	Russia	EE%sT	2011 Mar 27  2:00s
      new ZoneOffset(7200000, "Russia", "EE%sT", 1303869600000),
      //     		 3:00	-	+03	2014 Oct 26  2:00s
      new ZoneOffset(10800000, "-", "+0", -2114121600000),
      //     		 2:00	-	EET
      new ZoneOffset(7200000, "-", "EET", -1),
    ])
  );
  zones.set(
    "Europe/Moscow",
    new Zone("Europe/Moscow", [
      // Zone Europe/Moscow     2:30:17 -	LMT	1880
      new ZoneOffset(9017000, "-", "LMT", -2837462400000),
      //     		 2:30:17 -	MMT	1916 Jul  3 # Moscow Mean Time
      new ZoneOffset(9017000, "-", "MMT", -1685577600000),
      //     		 2:31:19 Russia	%s	1919 Jul  1  0:00u
      new ZoneOffset(9079000, "Russia", "%s", -1591142400000),
      //     		 3:00	Russia	%s	1921 Oct
      new ZoneOffset(10800000, "Russia", "%s", -1520035200000),
      //     		 3:00	Russia	MSK/MSD	1922 Oct
      new ZoneOffset(10800000, "Russia", "MSK/MSD", -1488499200000),
      //     		 2:00	-	EET	1930 Jun 21
      new ZoneOffset(7200000, "-", "EET", -1244937600000),
      //     		 3:00	Russia	MSK/MSD	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 673063200000),
      //     		 2:00	Russia	EE%sT	1992 Jan 19  2:00s
      new ZoneOffset(7200000, "Russia", "EE%sT", 698464800000),
      //     		 3:00	Russia	MSK/MSD	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 1303869600000),
      //     		 4:00	-	MSK	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "MSK", 1416967200000),
      //     		 3:00	-	MSK
      new ZoneOffset(10800000, "-", "MSK", -1),
    ])
  );
  zones.set(
    "Europe/Simferopol",
    new Zone("Europe/Simferopol", [
      // Zone Europe/Simferopol     2:16:24 -	LMT	1880
      new ZoneOffset(8184000, "-", "LMT", -2837462400000),
      //     		 2:16	-	SMT	1924 May  2 # Simferopol Mean T
      new ZoneOffset(8160000, "-", "SMT", -1438473600000),
      //     		 2:00	-	EET	1930 Jun 21
      new ZoneOffset(7200000, "-", "EET", -1244937600000),
      //     		 3:00	-	MSK	1941 Nov
      new ZoneOffset(10800000, "-", "MSK", -886291200000),
      //     		 1:00	C-Eur	CE%sT	1944 Apr 13
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -809049600000),
      //     		 3:00	Russia	MSK/MSD	1990
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 633830400000),
      //     		 3:00	-	MSK	1990 Jul  1  2:00
      new ZoneOffset(10800000, "-", "MSK", 649476000000),
      //     		 2:00	-	EET	1992
      new ZoneOffset(7200000, "-", "EET", 696902400000),
      //     		 2:00	E-Eur	EE%sT	1994 May
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 770428800000),
      //     		 3:00	E-Eur	MSK/MSD	1996 Mar 31  0:00s
      new ZoneOffset(10800000, "E-Eur", "MSK/MSD", 830908800000),
      //     		 3:00	1:00	MSD	1996 Oct 27  3:00s
      new ZoneOffset(10800000, "1:00", "MSD", 849063600000),
      //     		 3:00	Russia	MSK/MSD	1997
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 854755200000),
      //     		 3:00	-	MSK	1997 Mar lastSun  1:00u
      new ZoneOffset(10800000, "-", "MSK", 859852800000),
      //     		 2:00	EU	EE%sT	2014 Mar 30  2:00
      new ZoneOffset(7200000, "EU", "EE%sT", 1398823200000),
      //     		 4:00	-	MSK	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "MSK", 1416967200000),
      //     		 3:00	-	MSK
      new ZoneOffset(10800000, "-", "MSK", -1),
    ])
  );
  zones.set(
    "Europe/Astrakhan",
    new Zone("Europe/Astrakhan", [
      // Zone Europe/Astrakhan     3:12:12 -	LMT	1924 May
      new ZoneOffset(11532000, "-", "LMT", -1438560000000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	Russia	+04/+05	1989 Mar 26  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	1992 Mar 29  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082758400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082585600000),
      //     		 3:00	-	+03	2016 Mar 27  2:00s
      new ZoneOffset(10800000, "-", "+0", -2113948800000),
      //     		 4:00	-	+04
      new ZoneOffset(14400000, "-", "+0", -2080166400000),
    ])
  );
  zones.set(
    "Europe/Volgograd",
    new Zone("Europe/Volgograd", [
      // Zone Europe/Volgograd     2:57:40 -	LMT	1920 Jan  3
      new ZoneOffset(10660000, "-", "LMT", -1575072000000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	-	+04	1961 Nov 11
      new ZoneOffset(14400000, "-", "+0", -2082844800000),
      //     		 4:00	Russia	+04/+05	1988 Mar 27  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	1992 Mar 29  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082758400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082585600000),
      //     		 3:00	-	+03	2018 Oct 28  2:00s
      new ZoneOffset(10800000, "-", "+0", -2113776000000),
      //     		 4:00	-	+04	2020 Dec 27  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082931200000),
      //     		 3:00	-	+03
      new ZoneOffset(10800000, "-", "+0", -2111702400000),
    ])
  );
  zones.set(
    "Europe/Saratov",
    new Zone("Europe/Saratov", [
      // Zone Europe/Saratov     3:04:18 -	LMT	1919 Jul  1  0:00u
      new ZoneOffset(11058000, "-", "LMT", -1591142400000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	Russia	+04/+05	1988 Mar 27  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	1992 Mar 29  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082758400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082585600000),
      //     		 3:00	-	+03	2016 Dec  4  2:00s
      new ZoneOffset(10800000, "-", "+0", -2113948800000),
      //     		 4:00	-	+04
      new ZoneOffset(14400000, "-", "+0", -2080166400000),
    ])
  );
  zones.set(
    "Europe/Kirov",
    new Zone("Europe/Kirov", [
      // Zone Europe/Kirov     3:18:48 -	LMT	1919 Jul  1  0:00u
      new ZoneOffset(11928000, "-", "LMT", -1591142400000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	Russia	+04/+05	1989 Mar 26  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	1992 Mar 29  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082758400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082585600000),
      //     		 3:00	-	+03
      new ZoneOffset(10800000, "-", "+0", -2111702400000),
    ])
  );
  zones.set(
    "Europe/Samara",
    new Zone("Europe/Samara", [
      // Zone Europe/Samara     3:20:20 -	LMT	1919 Jul  1  0:00u
      new ZoneOffset(12020000, "-", "LMT", -1591142400000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	-	+04	1935 Jan 27
      new ZoneOffset(14400000, "-", "+0", -2082499200000),
      //     		 4:00	Russia	+04/+05	1989 Mar 26  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 2:00	Russia	+02/+03	1991 Sep 29  2:00s
      new ZoneOffset(7200000, "Russia", "+0", -2143238400000),
      //     		 3:00	-	+03	1991 Oct 20  3:00
      new ZoneOffset(10800000, "-", "+0", -2114380800000),
      //     		 4:00	Russia	+04/+05	2010 Mar 28  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04
      new ZoneOffset(14400000, "-", "+0", -2080166400000),
    ])
  );
  zones.set(
    "Europe/Ulyanovsk",
    new Zone("Europe/Ulyanovsk", [
      // Zone Europe/Ulyanovsk     3:13:36 -	LMT	1919 Jul  1  0:00u
      new ZoneOffset(11616000, "-", "LMT", -1591142400000),
      //     		 3:00	-	+03	1930 Jun 21
      new ZoneOffset(10800000, "-", "+0", -2114467200000),
      //     		 4:00	Russia	+04/+05	1989 Mar 26  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 3:00	Russia	+03/+04	1991 Mar 31  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 2:00	Russia	+02/+03	1992 Jan 19  2:00s
      new ZoneOffset(7200000, "Russia", "+0", -2143238400000),
      //     		 3:00	Russia	+03/+04	2011 Mar 27  2:00s
      new ZoneOffset(10800000, "Russia", "+0", -2111702400000),
      //     		 4:00	-	+04	2014 Oct 26  2:00s
      new ZoneOffset(14400000, "-", "+0", -2082585600000),
      //     		 3:00	-	+03	2016 Mar 27  2:00s
      new ZoneOffset(10800000, "-", "+0", -2113948800000),
      //     		 4:00	-	+04
      new ZoneOffset(14400000, "-", "+0", -2080166400000),
    ])
  );
  zones.set(
    "Asia/Yekaterinburg",
    new Zone("Asia/Yekaterinburg", [
      // Zone Asia/Yekaterinburg     4:02:33 -	LMT	1916 Jul  3
      new ZoneOffset(14553000, "-", "LMT", -1685577600000),
      //     		 3:45:05 -	PMT	1919 Jul 15  4:00
      new ZoneOffset(13505000, "-", "PMT", -1589918400000),
      //     		 4:00	-	+04	1930 Jun 21
      new ZoneOffset(14400000, "-", "+0", -2082931200000),
      //     		 5:00	Russia	+05/+06	1991 Mar 31  2:00s
      new ZoneOffset(18000000, "Russia", "+0", -2048544000000),
      //     		 4:00	Russia	+04/+05	1992 Jan 19  2:00s
      new ZoneOffset(14400000, "Russia", "+0", -2080166400000),
      //     		 5:00	Russia	+05/+06	2011 Mar 27  2:00s
      new ZoneOffset(18000000, "Russia", "+0", -2048544000000),
      //     		 6:00	-	+06	2014 Oct 26  2:00s
      new ZoneOffset(21600000, "-", "+0", -2019427200000),
      //     		 5:00	-	+05
      new ZoneOffset(18000000, "-", "+0", -2048544000000),
    ])
  );
  zones.set(
    "Asia/Omsk",
    new Zone("Asia/Omsk", [
      // Zone Asia/Omsk    	 4:53:30 -	LMT	1919 Nov 14
      new ZoneOffset(17610000, "-", "LMT", -1579478400000),
      //     		 5:00	-	+05	1930 Jun 21
      new ZoneOffset(18000000, "-", "+0", -2051308800000),
      //     		 6:00	Russia	+06/+07	1991 Mar 31  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 5:00	Russia	+05/+06	1992 Jan 19  2:00s
      new ZoneOffset(18000000, "Russia", "+0", -2048544000000),
      //     		 6:00	Russia	+06/+07	2011 Mar 27  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	-	+07	2014 Oct 26  2:00s
      new ZoneOffset(25200000, "-", "+0", -1987891200000),
      //     		 6:00	-	+06
      new ZoneOffset(21600000, "-", "+0", -2017008000000),
    ])
  );
  zones.set(
    "Asia/Barnaul",
    new Zone("Asia/Barnaul", [
      // Zone Asia/Barnaul     5:35:00 -	LMT	1919 Dec 10
      new ZoneOffset(20100000, "-", "LMT", -1577145600000),
      //     		 6:00	-	+06	1930 Jun 21
      new ZoneOffset(21600000, "-", "+0", -2019772800000),
      //     		 7:00	Russia	+07/+08	1991 Mar 31  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	1992 Jan 19  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	Russia	+07/+08	1995 May 28
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	2011 Mar 27  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	-	+07	2014 Oct 26  2:00s
      new ZoneOffset(25200000, "-", "+0", -1987891200000),
      //     		 6:00	-	+06	2016 Mar 27  2:00s
      new ZoneOffset(21600000, "-", "+0", -2019254400000),
      //     		 7:00	-	+07
      new ZoneOffset(25200000, "-", "+0", -1985472000000),
    ])
  );
  zones.set(
    "Asia/Novosibirsk",
    new Zone("Asia/Novosibirsk", [
      // Zone Asia/Novosibirsk     5:31:40 -	LMT	1919 Dec 14  6:00
      new ZoneOffset(19900000, "-", "LMT", -1576778400000),
      //     		 6:00	-	+06	1930 Jun 21
      new ZoneOffset(21600000, "-", "+0", -2019772800000),
      //     		 7:00	Russia	+07/+08	1991 Mar 31  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	1992 Jan 19  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	Russia	+07/+08	1993 May 23 # say Shanks & P.
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	2011 Mar 27  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	-	+07	2014 Oct 26  2:00s
      new ZoneOffset(25200000, "-", "+0", -1987891200000),
      //     		 6:00	-	+06	2016 Jul 24  2:00s
      new ZoneOffset(21600000, "-", "+0", -2019254400000),
      //     		 7:00	-	+07
      new ZoneOffset(25200000, "-", "+0", -1985472000000),
    ])
  );
  zones.set(
    "Asia/Tomsk",
    new Zone("Asia/Tomsk", [
      // Zone    Asia/Tomsk	 5:39:51 -	LMT	1919 Dec 22
      new ZoneOffset(20391000, "-", "LMT", -1576108800000),
      //     		 6:00	-	+06	1930 Jun 21
      new ZoneOffset(21600000, "-", "+0", -2019772800000),
      //     		 7:00	Russia	+07/+08	1991 Mar 31  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	1992 Jan 19  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	Russia	+07/+08	2002 May  1  3:00
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	2011 Mar 27  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	-	+07	2014 Oct 26  2:00s
      new ZoneOffset(25200000, "-", "+0", -1987891200000),
      //     		 6:00	-	+06	2016 May 29  2:00s
      new ZoneOffset(21600000, "-", "+0", -2019254400000),
      //     		 7:00	-	+07
      new ZoneOffset(25200000, "-", "+0", -1985472000000),
    ])
  );
  zones.set(
    "Asia/Novokuznetsk",
    new Zone("Asia/Novokuznetsk", [
      // Zone Asia/Novokuznetsk     5:48:48 -	LMT	1924 May  1
      new ZoneOffset(20928000, "-", "LMT", -1438560000000),
      //     		 6:00	-	+06	1930 Jun 21
      new ZoneOffset(21600000, "-", "+0", -2019772800000),
      //     		 7:00	Russia	+07/+08	1991 Mar 31  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	1992 Jan 19  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	Russia	+07/+08	2010 Mar 28  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	2011 Mar 27  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	-	+07
      new ZoneOffset(25200000, "-", "+0", -1985472000000),
    ])
  );
  zones.set(
    "Asia/Krasnoyarsk",
    new Zone("Asia/Krasnoyarsk", [
      // Zone Asia/Krasnoyarsk     6:11:26 -	LMT	1920 Jan  6
      new ZoneOffset(22286000, "-", "LMT", -1574812800000),
      //     		 6:00	-	+06	1930 Jun 21
      new ZoneOffset(21600000, "-", "+0", -2019772800000),
      //     		 7:00	Russia	+07/+08	1991 Mar 31  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 6:00	Russia	+06/+07	1992 Jan 19  2:00s
      new ZoneOffset(21600000, "Russia", "+0", -2017008000000),
      //     		 7:00	Russia	+07/+08	2011 Mar 27  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 8:00	-	+08	2014 Oct 26  2:00s
      new ZoneOffset(28800000, "-", "+0", -1956355200000),
      //     		 7:00	-	+07
      new ZoneOffset(25200000, "-", "+0", -1985472000000),
    ])
  );
  zones.set(
    "Asia/Irkutsk",
    new Zone("Asia/Irkutsk", [
      // Zone Asia/Irkutsk     6:57:05 -	LMT	1880
      new ZoneOffset(25025000, "-", "LMT", -2837462400000),
      //     		 6:57:05 -	IMT	1920 Jan 25 # Irkutsk Mean Time
      new ZoneOffset(25025000, "-", "IMT", -1573171200000),
      //     		 7:00	-	+07	1930 Jun 21
      new ZoneOffset(25200000, "-", "+0", -1988236800000),
      //     		 8:00	Russia	+08/+09	1991 Mar 31  2:00s
      new ZoneOffset(28800000, "Russia", "+0", -1953936000000),
      //     		 7:00	Russia	+07/+08	1992 Jan 19  2:00s
      new ZoneOffset(25200000, "Russia", "+0", -1985472000000),
      //     		 8:00	Russia	+08/+09	2011 Mar 27  2:00s
      new ZoneOffset(28800000, "Russia", "+0", -1953936000000),
      //     		 9:00	-	+09	2014 Oct 26  2:00s
      new ZoneOffset(32400000, "-", "+09", 1416967200000),
      //     		 8:00	-	+08
      new ZoneOffset(28800000, "-", "+0", -1953936000000),
    ])
  );
  zones.set(
    "Asia/Chita",
    new Zone("Asia/Chita", [
      // Zone Asia/Chita     7:33:52 -	LMT	1919 Dec 15
      new ZoneOffset(27232000, "-", "LMT", -1576713600000),
      //     		 8:00	-	+08	1930 Jun 21
      new ZoneOffset(28800000, "-", "+0", -1956700800000),
      //     		 9:00	Russia	+09/+10	1991 Mar 31  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		 8:00	Russia	+08/+09	1992 Jan 19  2:00s
      new ZoneOffset(28800000, "Russia", "+0", -1953936000000),
      //     		 9:00	Russia	+09/+10	2011 Mar 27  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		10:00	-	+10	2014 Oct 26  2:00s
      new ZoneOffset(36000000, "-", "+", -1893196800000),
      //     		 8:00	-	+08	2016 Mar 27  2:00
      new ZoneOffset(28800000, "-", "+0", -1956182400000),
      //     		 9:00	-	+09
      new ZoneOffset(32400000, "-", "+09", -1),
    ])
  );
  zones.set(
    "Asia/Yakutsk",
    new Zone("Asia/Yakutsk", [
      // Zone Asia/Yakutsk     8:38:58 -	LMT	1919 Dec 15
      new ZoneOffset(31138000, "-", "LMT", -1576713600000),
      //     		 8:00	-	+08	1930 Jun 21
      new ZoneOffset(28800000, "-", "+0", -1956700800000),
      //     		 9:00	Russia	+09/+10	1991 Mar 31  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		 8:00	Russia	+08/+09	1992 Jan 19  2:00s
      new ZoneOffset(28800000, "Russia", "+0", -1953936000000),
      //     		 9:00	Russia	+09/+10	2011 Mar 27  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		10:00	-	+10	2014 Oct 26  2:00s
      new ZoneOffset(36000000, "-", "+", -1893196800000),
      //     		 9:00	-	+09
      new ZoneOffset(32400000, "-", "+09", -1),
    ])
  );
  zones.set(
    "Asia/Vladivostok",
    new Zone("Asia/Vladivostok", [
      // Zone Asia/Vladivostok     8:47:31 -	LMT	1922 Nov 15
      new ZoneOffset(31651000, "-", "LMT", -1484697600000),
      //     		 9:00	-	+09	1930 Jun 21
      new ZoneOffset(32400000, "-", "+09", -1244937600000),
      //     		10:00	Russia	+10/+11	1991 Mar 31  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		 9:00	Russia	+09/+10	1992 Jan 19  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893369600000),
      //     		10:00	Russia	+10/+11	2011 Mar 27  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	-	+11	2014 Oct 26  2:00s
      new ZoneOffset(39600000, "-", "+", -1861660800000),
      //     		10:00	-	+10
      new ZoneOffset(36000000, "-", "+", -1890777600000),
    ])
  );
  zones.set(
    "Asia/Khandyga",
    new Zone("Asia/Khandyga", [
      // Zone Asia/Khandyga     9:02:13 -	LMT	1919 Dec 15
      new ZoneOffset(32533000, "-", "LMT", -1576713600000),
      //     		 8:00	-	+08	1930 Jun 21
      new ZoneOffset(28800000, "-", "+0", -1956700800000),
      //     		 9:00	Russia	+09/+10	1991 Mar 31  2:00s
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		 8:00	Russia	+08/+09	1992 Jan 19  2:00s
      new ZoneOffset(28800000, "Russia", "+0", -1953936000000),
      //     		 9:00	Russia	+09/+10	2004
      new ZoneOffset(32400000, "Russia", "+09/+", -1893196800000),
      //     		10:00	Russia	+10/+11	2011 Mar 27  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	-	+11	2011 Sep 13  0:00s # Decree 725?
      new ZoneOffset(39600000, "-", "+", -1861920000000),
      //     		10:00	-	+10	2014 Oct 26  2:00s
      new ZoneOffset(36000000, "-", "+", -1893196800000),
      //     		 9:00	-	+09
      new ZoneOffset(32400000, "-", "+09", -1),
    ])
  );
  zones.set(
    "Asia/Sakhalin",
    new Zone("Asia/Sakhalin", [
      // Zone Asia/Sakhalin     9:30:48 -	LMT	1905 Aug 23
      new ZoneOffset(34248000, "-", "LMT", -2028326400000),
      //     		 9:00	-	+09	1945 Aug 25
      new ZoneOffset(32400000, "-", "+09", -765849600000),
      //     		11:00	Russia	+11/+12	1991 Mar 31  2:00s # Sakhalin T
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		10:00	Russia	+10/+11	1992 Jan 19  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	Russia	+11/+12	1997 Mar lastSun  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		10:00	Russia	+10/+11	2011 Mar 27  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	-	+11	2014 Oct 26  2:00s
      new ZoneOffset(39600000, "-", "+", -1861660800000),
      //     		10:00	-	+10	2016 Mar 27  2:00s
      new ZoneOffset(36000000, "-", "+", -1893024000000),
      //     		11:00	-	+11
      new ZoneOffset(39600000, "-", "+", -1859241600000),
    ])
  );
  zones.set(
    "Asia/Magadan",
    new Zone("Asia/Magadan", [
      // Zone Asia/Magadan    10:03:12 -	LMT	1924 May  2
      new ZoneOffset(36192000, "-", "LMT", -1438473600000),
      //     		10:00	-	+10	1930 Jun 21 # Magadan Time
      new ZoneOffset(36000000, "-", "+", -1893542400000),
      //     		11:00	Russia	+11/+12	1991 Mar 31  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		10:00	Russia	+10/+11	1992 Jan 19  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	Russia	+11/+12	2011 Mar 27  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	-	+12	2014 Oct 26  2:00s
      new ZoneOffset(43200000, "-", "+", -1830124800000),
      //     		10:00	-	+10	2016 Apr 24  2:00s
      new ZoneOffset(36000000, "-", "+", -1893024000000),
      //     		11:00	-	+11
      new ZoneOffset(39600000, "-", "+", -1859241600000),
    ])
  );
  zones.set(
    "Asia/Srednekolymsk",
    new Zone("Asia/Srednekolymsk", [
      // Zone Asia/Srednekolymsk    10:14:52 -	LMT	1924 May  2
      new ZoneOffset(36892000, "-", "LMT", -1438473600000),
      //     		10:00	-	+10	1930 Jun 21
      new ZoneOffset(36000000, "-", "+", -1893542400000),
      //     		11:00	Russia	+11/+12	1991 Mar 31  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		10:00	Russia	+10/+11	1992 Jan 19  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	Russia	+11/+12	2011 Mar 27  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	-	+12	2014 Oct 26  2:00s
      new ZoneOffset(43200000, "-", "+", -1830124800000),
      //     		11:00	-	+11
      new ZoneOffset(39600000, "-", "+", -1859241600000),
    ])
  );
  zones.set(
    "Asia/Ust-Nera",
    new Zone("Asia/Ust-Nera", [
      // Zone Asia/Ust-Nera     9:32:54 -	LMT	1919 Dec 15
      new ZoneOffset(34374000, "-", "LMT", -1576713600000),
      //     		 8:00	-	+08	1930 Jun 21
      new ZoneOffset(28800000, "-", "+0", -1956700800000),
      //     		 9:00	Russia	+09/+10	1981 Apr  1
      new ZoneOffset(32400000, "Russia", "+09/+", -1893456000000),
      //     		11:00	Russia	+11/+12	1991 Mar 31  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		10:00	Russia	+10/+11	1992 Jan 19  2:00s
      new ZoneOffset(36000000, "Russia", "+", -1890777600000),
      //     		11:00	Russia	+11/+12	2011 Mar 27  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	-	+12	2011 Sep 13  0:00s # Decree 725?
      new ZoneOffset(43200000, "-", "+", -1830384000000),
      //     		11:00	-	+11	2014 Oct 26  2:00s
      new ZoneOffset(39600000, "-", "+", -1861660800000),
      //     		10:00	-	+10
      new ZoneOffset(36000000, "-", "+", -1890777600000),
    ])
  );
  zones.set(
    "Asia/Kamchatka",
    new Zone("Asia/Kamchatka", [
      // Zone Asia/Kamchatka    10:34:36 -	LMT	1922 Nov 10
      new ZoneOffset(38076000, "-", "LMT", -1485129600000),
      //     		11:00	-	+11	1930 Jun 21
      new ZoneOffset(39600000, "-", "+", -1862006400000),
      //     		12:00	Russia	+12/+13	1991 Mar 31  2:00s
      new ZoneOffset(43200000, "Russia", "+", -1827705600000),
      //     		11:00	Russia	+11/+12	1992 Jan 19  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	Russia	+12/+13	2010 Mar 28  2:00s
      new ZoneOffset(43200000, "Russia", "+", -1827705600000),
      //     		11:00	Russia	+11/+12	2011 Mar 27  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	-	+12
      new ZoneOffset(43200000, "-", "+", -1827705600000),
    ])
  );
  zones.set(
    "Asia/Anadyr",
    new Zone("Asia/Anadyr", [
      // Zone Asia/Anadyr    11:49:56 -	LMT	1924 May  2
      new ZoneOffset(42596000, "-", "LMT", -1438473600000),
      //     		12:00	-	+12	1930 Jun 21
      new ZoneOffset(43200000, "-", "+", -1830470400000),
      //     		13:00	Russia	+13/+14	1982 Apr  1  0:00s
      new ZoneOffset(46800000, "Russia", "+", -1796083200000),
      //     		12:00	Russia	+12/+13	1991 Mar 31  2:00s
      new ZoneOffset(43200000, "Russia", "+", -1827705600000),
      //     		11:00	Russia	+11/+12	1992 Jan 19  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	Russia	+12/+13	2010 Mar 28  2:00s
      new ZoneOffset(43200000, "Russia", "+", -1827705600000),
      //     		11:00	Russia	+11/+12	2011 Mar 27  2:00s
      new ZoneOffset(39600000, "Russia", "+", -1859241600000),
      //     		12:00	-	+12
      new ZoneOffset(43200000, "-", "+", -1827705600000),
    ])
  );
  zones.set(
    "Europe/Belgrade",
    new Zone("Europe/Belgrade", [
      // Zone    Europe/Belgrade	1:22:00	-	LMT	1884
      new ZoneOffset(4920000, "-", "LMT", -2711232000000),
      //     		1:00	-	CET	1941 Apr 18 23:00
      new ZoneOffset(3600000, "-", "CET", -903229200000),
      //     		1:00	C-Eur	CE%sT	1945
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -786240000000),
      //     		1:00	-	CET	1945 May  8  2:00s
      new ZoneOffset(3600000, "-", "CET", -775260000000),
      //     		1:00	1:00	CEST	1945 Sep 16  2:00s
      new ZoneOffset(3600000, "1:00", "CEST", -764028000000),
      //     		1:00	-	CET	1982 Nov 27
      new ZoneOffset(3600000, "-", "CET", 409795200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Madrid",
    new Zone("Europe/Madrid", [
      // Zone    Europe/Madrid	-0:14:44 -	LMT	1900 Dec 31 23:45:16
      new ZoneOffset(-884000, "-", "LMT", -2174775300000),
      //     		 0:00	Spain	WE%sT	1940 Mar 16 23:00
      new ZoneOffset(0, "Spain", "WE%sT", -937530000000),
      //     		 1:00	Spain	CE%sT	1979
      new ZoneOffset(3600000, "Spain", "CE%sT", 286675200000),
      //     		 1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Africa/Ceuta",
    new Zone("Africa/Ceuta", [
      // Zone    Africa/Ceuta	-0:21:16 -	LMT	1900 Dec 31 23:38:44
      new ZoneOffset(-1276000, "-", "LMT", -2174775720000),
      //     		 0:00	-	WET	1918 May  6 23:00
      new ZoneOffset(0, "-", "WET", -1627434000000),
      //     		 0:00	1:00	WEST	1918 Oct  7 23:00
      new ZoneOffset(0, "1:00", "WEST", -1614128400000),
      //     		 0:00	-	WET	1924
      new ZoneOffset(0, "-", "WET", -1449014400000),
      //     		 0:00	Spain	WE%sT	1929
      new ZoneOffset(0, "Spain", "WE%sT", -1291161600000),
      //     		 0:00	-	WET	1967 # Help zishrink.awk.
      new ZoneOffset(0, "-", "WET", -92016000000),
      //     		 0:00 SpainAfrica WE%sT	1984 Mar 16
      new ZoneOffset(0, "SpainAfrica", "WE%sT", 450921600000),
      //     		 1:00	-	CET	1986
      new ZoneOffset(3600000, "-", "CET", 507600000000),
      //     		 1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Atlantic/Canary",
    new Zone("Atlantic/Canary", [
      // Zone    Atlantic/Canary	-1:01:36 -	LMT	1922 Mar # Las Palmas de Gran C.
      new ZoneOffset(-3696000, "-", "LMT", -1506988800000),
      //     		-1:00	-	-01	1946 Sep 30  1:00
      new ZoneOffset(-3600000, "-", "-0", -2177020800000),
      //     		 0:00	-	WET	1980 Apr  6  0:00s
      new ZoneOffset(0, "-", "WET", 326419200000),
      //     		 0:00	1:00	WEST	1980 Sep 28  1:00u
      new ZoneOffset(0, "1:00", "WEST", 341542800000),
      //     		 0:00	EU	WE%sT
      new ZoneOffset(0, "EU", "WE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Stockholm",
    new Zone("Europe/Stockholm", [
      // Zone Europe/Stockholm    1:12:12 -	LMT	1879 Jan  1
      new ZoneOffset(4332000, "-", "LMT", -2868998400000),
      //     		1:00:14	-	SET	1900 Jan  1 # Swedish Time
      new ZoneOffset(3614000, "-", "SET", -2206310400000),
      //     		1:00	-	CET	1916 May 14 23:00
      new ZoneOffset(3600000, "-", "CET", -1689814800000),
      //     		1:00	1:00	CEST	1916 Oct  1  1:00
      new ZoneOffset(3600000, "1:00", "CEST", -1677798000000),
      //     		1:00	-	CET	1980
      new ZoneOffset(3600000, "-", "CET", 318211200000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Zurich",
    new Zone("Europe/Zurich", [
      // Zone    Europe/Zurich	0:34:08 -	LMT	1853 Jul 16 # See above comment.
      new ZoneOffset(2048000, "-", "LMT", -3672518400000),
      //     		0:29:46	-	BMT	1894 Jun    # Bern Mean Time
      new ZoneOffset(1786000, "-", "BMT", -2382652800000),
      //     		1:00	Swiss	CE%sT	1981
      new ZoneOffset(3600000, "Swiss", "CE%sT", 349833600000),
      //     		1:00	EU	CE%sT
      new ZoneOffset(3600000, "EU", "CE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Istanbul",
    new Zone("Europe/Istanbul", [
      // Zone    Europe/Istanbul	1:55:52 -	LMT	1880
      new ZoneOffset(6952000, "-", "LMT", -2837462400000),
      //     		1:56:56	-	IMT	1910 Oct # Istanbul Mean Time?
      new ZoneOffset(7016000, "-", "IMT", -1867190400000),
      //     		2:00	Turkey	EE%sT	1978 Jun 29
      new ZoneOffset(7200000, "Turkey", "EE%sT", 270518400000),
      //     		3:00	Turkey	+03/+04	1984 Nov  1  2:00
      new ZoneOffset(10800000, "Turkey", "+0", -2111702400000),
      //     		2:00	Turkey	EE%sT	2007
      new ZoneOffset(7200000, "Turkey", "EE%sT", 1170288000000),
      //     		2:00	EU	EE%sT	2011 Mar 27  1:00u
      new ZoneOffset(7200000, "EU", "EE%sT", 1303866000000),
      //     		2:00	-	EET	2011 Mar 28  1:00u
      new ZoneOffset(7200000, "-", "EET", 1303952400000),
      //     		2:00	EU	EE%sT	2014 Mar 30  1:00u
      new ZoneOffset(7200000, "EU", "EE%sT", 1398819600000),
      //     		2:00	-	EET	2014 Mar 31  1:00u
      new ZoneOffset(7200000, "-", "EET", 1398906000000),
      //     		2:00	EU	EE%sT	2015 Oct 25  1:00u
      new ZoneOffset(7200000, "EU", "EE%sT", 1448413200000),
      //     		2:00	1:00	EEST	2015 Nov  8  1:00u
      new ZoneOffset(7200000, "1:00", "EEST", 1449536400000),
      //     		2:00	EU	EE%sT	2016 Sep  7
      new ZoneOffset(7200000, "EU", "EE%sT", 1475798400000),
      //     		3:00	-	+03
      new ZoneOffset(10800000, "-", "+0", -2111702400000),
    ])
  );
  zones.set(
    "Europe/Kiev",
    new Zone("Europe/Kiev", [
      // Zone Europe/Kiev    2:02:04 -	LMT	1880
      new ZoneOffset(7324000, "-", "LMT", -2837462400000),
      //     		2:02:04	-	KMT	1924 May  2 # Kiev Mean Time
      new ZoneOffset(7324000, "-", "KMT", -1438473600000),
      //     		2:00	-	EET	1930 Jun 21
      new ZoneOffset(7200000, "-", "EET", -1244937600000),
      //     		3:00	-	MSK	1941 Sep 20
      new ZoneOffset(10800000, "-", "MSK", -889920000000),
      //     		1:00	C-Eur	CE%sT	1943 Nov  6
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -822787200000),
      //     		3:00	Russia	MSK/MSD	1990 Jul  1  2:00
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 649476000000),
      //     		2:00	1:00	EEST	1991 Sep 29  3:00
      new ZoneOffset(7200000, "1:00", "EEST", 688705200000),
      //     		2:00	E-Eur	EE%sT	1995
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 791596800000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Uzhgorod",
    new Zone("Europe/Uzhgorod", [
      // Zone Europe/Uzhgorod    1:29:12 -	LMT	1890 Oct
      new ZoneOffset(5352000, "-", "LMT", -2498256000000),
      //     		1:00	-	CET	1940
      new ZoneOffset(3600000, "-", "CET", -944092800000),
      //     		1:00	C-Eur	CE%sT	1944 Oct
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -794188800000),
      //     		1:00	1:00	CEST	1944 Oct 26
      new ZoneOffset(3600000, "1:00", "CEST", -792028800000),
      //     		1:00	-	CET	1945 Jun 29
      new ZoneOffset(3600000, "-", "CET", -770860800000),
      //     		3:00	Russia	MSK/MSD	1990
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 633830400000),
      //     		3:00	-	MSK	1990 Jul  1  2:00
      new ZoneOffset(10800000, "-", "MSK", 649476000000),
      //     		1:00	-	CET	1991 Mar 31  3:00
      new ZoneOffset(3600000, "-", "CET", 673066800000),
      //     		2:00	-	EET	1992
      new ZoneOffset(7200000, "-", "EET", 696902400000),
      //     		2:00	E-Eur	EE%sT	1995
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 791596800000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  zones.set(
    "Europe/Zaporozhye",
    new Zone("Europe/Zaporozhye", [
      // Zone Europe/Zaporozhye    2:20:40 -	LMT	1880
      new ZoneOffset(8440000, "-", "LMT", -2837462400000),
      //     		2:20	-	+0220	1924 May  2
      new ZoneOffset(8400000, "-", "+0", -55224460800000),
      //     		2:00	-	EET	1930 Jun 21
      new ZoneOffset(7200000, "-", "EET", -1244937600000),
      //     		3:00	-	MSK	1941 Aug 25
      new ZoneOffset(10800000, "-", "MSK", -892080000000),
      //     		1:00	C-Eur	CE%sT	1943 Oct 25
      new ZoneOffset(3600000, "C-Eur", "CE%sT", -823737600000),
      //     		3:00	Russia	MSK/MSD	1991 Mar 31  2:00
      new ZoneOffset(10800000, "Russia", "MSK/MSD", 673063200000),
      //     		2:00	E-Eur	EE%sT	1995
      new ZoneOffset(7200000, "E-Eur", "EE%sT", 791596800000),
      //     		2:00	EU	EE%sT
      new ZoneOffset(7200000, "EU", "EE%sT", -1),
    ])
  );
  return zones;
}

// @ts-ignore
@lazy
const rules = createRules();

function createRules(): Rule[] {
  return [
    // Rule    US	1918	1919	-	Mar	lastSun	2:00	1:00	D
    new Rule(
      "US",
      1918,
      1919,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1918	1919	-	Oct	lastSun	2:00	0	S
    new Rule("US", 1918, 1919, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    US	1942	only	-	Feb	9	2:00	1:00	W # War
    new Rule(
      "US",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "US",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    US	1945	only	-	Sep	30	2:00	0	S
    new Rule("US", 1945, 1945, 9, new DayOfMonth(30), 120, AtTimeZone.Local, 0),
    // Rule    US	1967	2006	-	Oct	lastSun	2:00	0	S
    new Rule("US", 1967, 2006, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    US	1967	1973	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "US",
      1967,
      1973,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1974	only	-	Jan	6	2:00	1:00	D
    new Rule(
      "US",
      1974,
      1974,
      1,
      new DayOfMonth(6),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1975	only	-	Feb	lastSun	2:00	1:00	D
    new Rule(
      "US",
      1975,
      1975,
      2,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1976	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "US",
      1976,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	1987	2006	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "US",
      1987,
      2006,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	2007	max	-	Mar	Sun>=8	2:00	1:00	D
    new Rule(
      "US",
      2007,
      -1,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    US	2007	max	-	Nov	Sun>=1	2:00	0	S
    new Rule(
      "US",
      2007,
      -1,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    NYC	1920	only	-	Mar	lastSun	2:00	1:00	D
    new Rule(
      "NYC",
      1920,
      1920,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NYC	1920	only	-	Oct	lastSun	2:00	0	S
    new Rule("NYC", 1920, 1920, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    NYC	1921	1966	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "NYC",
      1921,
      1966,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NYC	1921	1954	-	Sep	lastSun	2:00	0	S
    new Rule("NYC", 1921, 1954, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    NYC	1955	1966	-	Oct	lastSun	2:00	0	S
    new Rule("NYC", 1955, 1966, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Chicago	1920	only	-	Jun	13	2:00	1:00	D
    new Rule(
      "Chicago",
      1920,
      1920,
      6,
      new DayOfMonth(13),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Chicago	1920	1921	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Chicago",
      1920,
      1921,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Chicago	1921	only	-	Mar	lastSun	2:00	1:00	D
    new Rule(
      "Chicago",
      1921,
      1921,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Chicago	1922	1966	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Chicago",
      1922,
      1966,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Chicago	1922	1954	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Chicago",
      1922,
      1954,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Chicago	1955	1966	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Chicago",
      1955,
      1966,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denver	1920	1921	-	Mar	lastSun	2:00	1:00	D
    new Rule(
      "Denver",
      1920,
      1921,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denver	1920	only	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Denver",
      1920,
      1920,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denver	1921	only	-	May	22	2:00	0	S
    new Rule(
      "Denver",
      1921,
      1921,
      5,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denver	1965	1966	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Denver",
      1965,
      1966,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denver	1965	1966	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Denver",
      1965,
      1966,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    CA	1948	only	-	Mar	14	2:01	1:00	D
    new Rule(
      "CA",
      1948,
      1948,
      3,
      new DayOfMonth(14),
      121,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    CA	1949	only	-	Jan	 1	2:00	0	S
    new Rule("CA", 1949, 1949, 1, new DayOfMonth(1), 120, AtTimeZone.Local, 0),
    // Rule    CA	1950	1966	-	Apr	lastSun	1:00	1:00	D
    new Rule(
      "CA",
      1950,
      1966,
      4,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    CA	1950	1961	-	Sep	lastSun	2:00	0	S
    new Rule("CA", 1950, 1961, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    CA	1962	1966	-	Oct	lastSun	2:00	0	S
    new Rule("CA", 1962, 1966, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule Indianapolis 1941    only	-	Jun	22	2:00	1:00	D
    new Rule(
      "Indianapolis",
      1941,
      1941,
      6,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Indianapolis 1941    1954	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Indianapolis",
      1941,
      1954,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Indianapolis 1946    1954	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Indianapolis",
      1946,
      1954,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Marengo	1951	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Marengo",
      1951,
      1951,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Marengo	1951	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Marengo",
      1951,
      1951,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Marengo	1954	1960	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Marengo",
      1954,
      1960,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Marengo	1954	1960	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Marengo",
      1954,
      1960,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Vincennes    1946	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Vincennes",
      1946,
      1946,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Vincennes    1946	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Vincennes",
      1946,
      1946,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Vincennes    1953	1954	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Vincennes",
      1953,
      1954,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Vincennes    1953	1959	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Vincennes",
      1953,
      1959,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Vincennes    1955	only	-	May	 1	0:00	1:00	D
    new Rule(
      "Vincennes",
      1955,
      1955,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Vincennes    1956	1963	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Vincennes",
      1956,
      1963,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Vincennes    1960	only	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Vincennes",
      1960,
      1960,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Vincennes    1961	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Vincennes",
      1961,
      1961,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Vincennes    1962	1963	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Vincennes",
      1962,
      1963,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Perry    1955	only	-	May	 1	0:00	1:00	D
    new Rule(
      "Perry",
      1955,
      1955,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Perry    1955	1960	-	Sep	lastSun	2:00	0	S
    new Rule("Perry", 1955, 1960, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule Perry    1956	1963	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Perry",
      1956,
      1963,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Perry    1961	1963	-	Oct	lastSun	2:00	0	S
    new Rule("Perry", 1961, 1963, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Pike	1955	only	-	May	 1	0:00	1:00	D
    new Rule(
      "Pike",
      1955,
      1955,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Pike	1955	1960	-	Sep	lastSun	2:00	0	S
    new Rule("Pike", 1955, 1960, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Pike	1956	1964	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Pike",
      1956,
      1964,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Pike	1961	1964	-	Oct	lastSun	2:00	0	S
    new Rule("Pike", 1961, 1964, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Starke	1947	1961	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Starke",
      1947,
      1961,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Starke	1947	1954	-	Sep	lastSun	2:00	0	S
    new Rule("Starke", 1947, 1954, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Starke	1955	1956	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Starke",
      1955,
      1956,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Starke	1957	1958	-	Sep	lastSun	2:00	0	S
    new Rule("Starke", 1957, 1958, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Starke	1959	1961	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Starke",
      1959,
      1961,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Pulaski	1946	1960	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Pulaski",
      1946,
      1960,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Pulaski	1946	1954	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Pulaski",
      1946,
      1954,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Pulaski	1955	1956	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Pulaski",
      1955,
      1956,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Pulaski	1957	1960	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Pulaski",
      1957,
      1960,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Louisville    1921	only	-	May	1	2:00	1:00	D
    new Rule(
      "Louisville",
      1921,
      1921,
      5,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Louisville    1921	only	-	Sep	1	2:00	0	S
    new Rule(
      "Louisville",
      1921,
      1921,
      9,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Louisville    1941	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Louisville",
      1941,
      1941,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Louisville    1941	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Louisville",
      1941,
      1941,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Louisville    1946	only	-	Apr	lastSun	0:01	1:00	D
    new Rule(
      "Louisville",
      1946,
      1946,
      4,
      new LastDay(7),
      1,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Louisville    1946	only	-	Jun	2	2:00	0	S
    new Rule(
      "Louisville",
      1946,
      1946,
      6,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Louisville    1950	1961	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Louisville",
      1950,
      1961,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Louisville    1950	1955	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Louisville",
      1950,
      1955,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Louisville    1956	1961	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Louisville",
      1956,
      1961,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Detroit	1948	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Detroit",
      1948,
      1948,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Detroit	1948	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Detroit",
      1948,
      1948,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Menominee    1946	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Menominee",
      1946,
      1946,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Menominee    1946	only	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Menominee",
      1946,
      1946,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule Menominee    1966	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Menominee",
      1966,
      1966,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule Menominee    1966	only	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Menominee",
      1966,
      1966,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Canada	1918	only	-	Apr	14	2:00	1:00	D
    new Rule(
      "Canada",
      1918,
      1918,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Canada	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "Canada",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Canada	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "Canada",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Canada	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Canada",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Canada	1945	only	-	Sep	30	2:00	0	S
    new Rule(
      "Canada",
      1945,
      1945,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Canada	1974	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Canada",
      1974,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Canada	1974	2006	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Canada",
      1974,
      2006,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Canada	1987	2006	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "Canada",
      1987,
      2006,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Canada	2007	max	-	Mar	Sun>=8	2:00	1:00	D
    new Rule(
      "Canada",
      2007,
      -1,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Canada	2007	max	-	Nov	Sun>=1	2:00	0	S
    new Rule(
      "Canada",
      2007,
      -1,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1917	only	-	Apr	 8	2:00	1:00	D
    new Rule(
      "StJohns",
      1917,
      1917,
      4,
      new DayOfMonth(8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1917	only	-	Sep	17	2:00	0	S
    new Rule(
      "StJohns",
      1917,
      1917,
      9,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1919	only	-	May	 5	23:00	1:00	D
    new Rule(
      "StJohns",
      1919,
      1919,
      5,
      new DayOfMonth(5),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1919	only	-	Aug	12	23:00	0	S
    new Rule(
      "StJohns",
      1919,
      1919,
      8,
      new DayOfMonth(12),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1920	1935	-	May	Sun>=1	23:00	1:00	D
    new Rule(
      "StJohns",
      1920,
      1935,
      5,
      new NextDayAfter(7, 1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1920	1935	-	Oct	lastSun	23:00	0	S
    new Rule(
      "StJohns",
      1920,
      1935,
      10,
      new LastDay(7),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1936	1941	-	May	Mon>=9	0:00	1:00	D
    new Rule(
      "StJohns",
      1936,
      1941,
      5,
      new NextDayAfter(1, 9),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1936	1941	-	Oct	Mon>=2	0:00	0	S
    new Rule(
      "StJohns",
      1936,
      1941,
      10,
      new NextDayAfter(1, 2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1946	1950	-	May	Sun>=8	2:00	1:00	D
    new Rule(
      "StJohns",
      1946,
      1950,
      5,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1946	1950	-	Oct	Sun>=2	2:00	0	S
    new Rule(
      "StJohns",
      1946,
      1950,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1951	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "StJohns",
      1951,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1951	1959	-	Sep	lastSun	2:00	0	S
    new Rule(
      "StJohns",
      1951,
      1959,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1960	1986	-	Oct	lastSun	2:00	0	S
    new Rule(
      "StJohns",
      1960,
      1986,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    StJohns	1987	only	-	Apr	Sun>=1	0:01	1:00	D
    new Rule(
      "StJohns",
      1987,
      1987,
      4,
      new NextDayAfter(7, 1),
      1,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	1987	2006	-	Oct	lastSun	0:01	0	S
    new Rule("StJohns", 1987, 2006, 10, new LastDay(7), 1, AtTimeZone.Local, 0),
    // Rule    StJohns	1988	only	-	Apr	Sun>=1	0:01	2:00	DD
    new Rule(
      "StJohns",
      1988,
      1988,
      4,
      new NextDayAfter(7, 1),
      1,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    StJohns	1989	2006	-	Apr	Sun>=1	0:01	1:00	D
    new Rule(
      "StJohns",
      1989,
      2006,
      4,
      new NextDayAfter(7, 1),
      1,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	2007	2011	-	Mar	Sun>=8	0:01	1:00	D
    new Rule(
      "StJohns",
      2007,
      2011,
      3,
      new NextDayAfter(7, 8),
      1,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    StJohns	2007	2010	-	Nov	Sun>=1	0:01	0	S
    new Rule(
      "StJohns",
      2007,
      2010,
      11,
      new NextDayAfter(7, 1),
      1,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1916	only	-	Apr	 1	0:00	1:00	D
    new Rule(
      "Halifax",
      1916,
      1916,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1916	only	-	Oct	 1	0:00	0	S
    new Rule(
      "Halifax",
      1916,
      1916,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1920	only	-	May	 9	0:00	1:00	D
    new Rule(
      "Halifax",
      1920,
      1920,
      5,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1920	only	-	Aug	29	0:00	0	S
    new Rule(
      "Halifax",
      1920,
      1920,
      8,
      new DayOfMonth(29),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1921	only	-	May	 6	0:00	1:00	D
    new Rule(
      "Halifax",
      1921,
      1921,
      5,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1921	1922	-	Sep	 5	0:00	0	S
    new Rule(
      "Halifax",
      1921,
      1922,
      9,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1922	only	-	Apr	30	0:00	1:00	D
    new Rule(
      "Halifax",
      1922,
      1922,
      4,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1923	1925	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Halifax",
      1923,
      1925,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1923	only	-	Sep	 4	0:00	0	S
    new Rule(
      "Halifax",
      1923,
      1923,
      9,
      new DayOfMonth(4),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1924	only	-	Sep	15	0:00	0	S
    new Rule(
      "Halifax",
      1924,
      1924,
      9,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1925	only	-	Sep	28	0:00	0	S
    new Rule(
      "Halifax",
      1925,
      1925,
      9,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1926	only	-	May	16	0:00	1:00	D
    new Rule(
      "Halifax",
      1926,
      1926,
      5,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1926	only	-	Sep	13	0:00	0	S
    new Rule(
      "Halifax",
      1926,
      1926,
      9,
      new DayOfMonth(13),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1927	only	-	May	 1	0:00	1:00	D
    new Rule(
      "Halifax",
      1927,
      1927,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1927	only	-	Sep	26	0:00	0	S
    new Rule(
      "Halifax",
      1927,
      1927,
      9,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1928	1931	-	May	Sun>=8	0:00	1:00	D
    new Rule(
      "Halifax",
      1928,
      1931,
      5,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1928	only	-	Sep	 9	0:00	0	S
    new Rule(
      "Halifax",
      1928,
      1928,
      9,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1929	only	-	Sep	 3	0:00	0	S
    new Rule(
      "Halifax",
      1929,
      1929,
      9,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1930	only	-	Sep	15	0:00	0	S
    new Rule(
      "Halifax",
      1930,
      1930,
      9,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1931	1932	-	Sep	Mon>=24	0:00	0	S
    new Rule(
      "Halifax",
      1931,
      1932,
      9,
      new NextDayAfter(1, 24),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1932	only	-	May	 1	0:00	1:00	D
    new Rule(
      "Halifax",
      1932,
      1932,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1933	only	-	Apr	30	0:00	1:00	D
    new Rule(
      "Halifax",
      1933,
      1933,
      4,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1933	only	-	Oct	 2	0:00	0	S
    new Rule(
      "Halifax",
      1933,
      1933,
      10,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1934	only	-	May	20	0:00	1:00	D
    new Rule(
      "Halifax",
      1934,
      1934,
      5,
      new DayOfMonth(20),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1934	only	-	Sep	16	0:00	0	S
    new Rule(
      "Halifax",
      1934,
      1934,
      9,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1935	only	-	Jun	 2	0:00	1:00	D
    new Rule(
      "Halifax",
      1935,
      1935,
      6,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1935	only	-	Sep	30	0:00	0	S
    new Rule(
      "Halifax",
      1935,
      1935,
      9,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1936	only	-	Jun	 1	0:00	1:00	D
    new Rule(
      "Halifax",
      1936,
      1936,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1936	only	-	Sep	14	0:00	0	S
    new Rule(
      "Halifax",
      1936,
      1936,
      9,
      new DayOfMonth(14),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1937	1938	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Halifax",
      1937,
      1938,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1937	1941	-	Sep	Mon>=24	0:00	0	S
    new Rule(
      "Halifax",
      1937,
      1941,
      9,
      new NextDayAfter(1, 24),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1939	only	-	May	28	0:00	1:00	D
    new Rule(
      "Halifax",
      1939,
      1939,
      5,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1940	1941	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Halifax",
      1940,
      1941,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1946	1949	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Halifax",
      1946,
      1949,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1946	1949	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Halifax",
      1946,
      1949,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1951	1954	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Halifax",
      1951,
      1954,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1951	1954	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Halifax",
      1951,
      1954,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1956	1959	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Halifax",
      1956,
      1959,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1956	1959	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Halifax",
      1956,
      1959,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Halifax	1962	1973	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Halifax",
      1962,
      1973,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Halifax	1962	1973	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Halifax",
      1962,
      1973,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1933	1935	-	Jun	Sun>=8	1:00	1:00	D
    new Rule(
      "Moncton",
      1933,
      1935,
      6,
      new NextDayAfter(7, 8),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1933	1935	-	Sep	Sun>=8	1:00	0	S
    new Rule(
      "Moncton",
      1933,
      1935,
      9,
      new NextDayAfter(7, 8),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1936	1938	-	Jun	Sun>=1	1:00	1:00	D
    new Rule(
      "Moncton",
      1936,
      1938,
      6,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1936	1938	-	Sep	Sun>=1	1:00	0	S
    new Rule(
      "Moncton",
      1936,
      1938,
      9,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1939	only	-	May	27	1:00	1:00	D
    new Rule(
      "Moncton",
      1939,
      1939,
      5,
      new DayOfMonth(27),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1939	1941	-	Sep	Sat>=21	1:00	0	S
    new Rule(
      "Moncton",
      1939,
      1941,
      9,
      new NextDayAfter(6, 21),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1940	only	-	May	19	1:00	1:00	D
    new Rule(
      "Moncton",
      1940,
      1940,
      5,
      new DayOfMonth(19),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1941	only	-	May	 4	1:00	1:00	D
    new Rule(
      "Moncton",
      1941,
      1941,
      5,
      new DayOfMonth(4),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1946	1972	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Moncton",
      1946,
      1972,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1946	1956	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Moncton",
      1946,
      1956,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1957	1972	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Moncton",
      1957,
      1972,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Moncton	1993	2006	-	Apr	Sun>=1	0:01	1:00	D
    new Rule(
      "Moncton",
      1993,
      2006,
      4,
      new NextDayAfter(7, 1),
      1,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moncton	1993	2006	-	Oct	lastSun	0:01	0	S
    new Rule("Moncton", 1993, 2006, 10, new LastDay(7), 1, AtTimeZone.Local, 0),
    // Rule    Toronto	1919	only	-	Mar	30	23:30	1:00	D
    new Rule(
      "Toronto",
      1919,
      1919,
      3,
      new DayOfMonth(30),
      1410,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1919	only	-	Oct	26	0:00	0	S
    new Rule(
      "Toronto",
      1919,
      1919,
      10,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1920	only	-	May	 2	2:00	1:00	D
    new Rule(
      "Toronto",
      1920,
      1920,
      5,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1920	only	-	Sep	26	0:00	0	S
    new Rule(
      "Toronto",
      1920,
      1920,
      9,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1921	only	-	May	15	2:00	1:00	D
    new Rule(
      "Toronto",
      1921,
      1921,
      5,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1921	only	-	Sep	15	2:00	0	S
    new Rule(
      "Toronto",
      1921,
      1921,
      9,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1922	1923	-	May	Sun>=8	2:00	1:00	D
    new Rule(
      "Toronto",
      1922,
      1923,
      5,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1922	1926	-	Sep	Sun>=15	2:00	0	S
    new Rule(
      "Toronto",
      1922,
      1926,
      9,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1924	1927	-	May	Sun>=1	2:00	1:00	D
    new Rule(
      "Toronto",
      1924,
      1927,
      5,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1927	1937	-	Sep	Sun>=25	2:00	0	S
    new Rule(
      "Toronto",
      1927,
      1937,
      9,
      new NextDayAfter(7, 25),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1928	1937	-	Apr	Sun>=25	2:00	1:00	D
    new Rule(
      "Toronto",
      1928,
      1937,
      4,
      new NextDayAfter(7, 25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1938	1940	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Toronto",
      1938,
      1940,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1938	1939	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Toronto",
      1938,
      1939,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1945	1946	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Toronto",
      1945,
      1946,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1946	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Toronto",
      1946,
      1946,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1947	1949	-	Apr	lastSun	0:00	1:00	D
    new Rule(
      "Toronto",
      1947,
      1949,
      4,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1947	1948	-	Sep	lastSun	0:00	0	S
    new Rule("Toronto", 1947, 1948, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Toronto	1949	only	-	Nov	lastSun	0:00	0	S
    new Rule("Toronto", 1949, 1949, 11, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Toronto	1950	1973	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Toronto",
      1950,
      1973,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Toronto	1950	only	-	Nov	lastSun	2:00	0	S
    new Rule(
      "Toronto",
      1950,
      1950,
      11,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1951	1956	-	Sep	lastSun	2:00	0	S
    new Rule(
      "Toronto",
      1951,
      1956,
      9,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Toronto	1957	1973	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Toronto",
      1957,
      1973,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1916	only	-	Apr	23	0:00	1:00	D
    new Rule(
      "Winn",
      1916,
      1916,
      4,
      new DayOfMonth(23),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1916	only	-	Sep	17	0:00	0	S
    new Rule("Winn", 1916, 1916, 9, new DayOfMonth(17), 0, AtTimeZone.Local, 0),
    // Rule    Winn	1918	only	-	Apr	14	2:00	1:00	D
    new Rule(
      "Winn",
      1918,
      1918,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "Winn",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1937	only	-	May	16	2:00	1:00	D
    new Rule(
      "Winn",
      1937,
      1937,
      5,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1937	only	-	Sep	26	2:00	0	S
    new Rule(
      "Winn",
      1937,
      1937,
      9,
      new DayOfMonth(26),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "Winn",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Winn",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Winn	1945	only	-	Sep	lastSun	2:00	0	S
    new Rule("Winn", 1945, 1945, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1946	only	-	May	12	2:00	1:00	D
    new Rule(
      "Winn",
      1946,
      1946,
      5,
      new DayOfMonth(12),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1946	only	-	Oct	13	2:00	0	S
    new Rule(
      "Winn",
      1946,
      1946,
      10,
      new DayOfMonth(13),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1947	1949	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Winn",
      1947,
      1949,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1947	1949	-	Sep	lastSun	2:00	0	S
    new Rule("Winn", 1947, 1949, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1950	only	-	May	 1	2:00	1:00	D
    new Rule(
      "Winn",
      1950,
      1950,
      5,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1950	only	-	Sep	30	2:00	0	S
    new Rule(
      "Winn",
      1950,
      1950,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1951	1960	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Winn",
      1951,
      1960,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1951	1958	-	Sep	lastSun	2:00	0	S
    new Rule("Winn", 1951, 1958, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1959	only	-	Oct	lastSun	2:00	0	S
    new Rule("Winn", 1959, 1959, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1960	only	-	Sep	lastSun	2:00	0	S
    new Rule("Winn", 1960, 1960, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1963	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Winn",
      1963,
      1963,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1963	only	-	Sep	22	2:00	0	S
    new Rule(
      "Winn",
      1963,
      1963,
      9,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Winn	1966	1986	-	Apr	lastSun	2:00s	1:00	D
    new Rule(
      "Winn",
      1966,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Winn	1966	2005	-	Oct	lastSun	2:00s	0	S
    new Rule("Winn", 1966, 2005, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Winn	1987	2005	-	Apr	Sun>=1	2:00s	1:00	D
    new Rule(
      "Winn",
      1987,
      2005,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1918	only	-	Apr	14	2:00	1:00	D
    new Rule(
      "Regina",
      1918,
      1918,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "Regina",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1930	1934	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Regina",
      1930,
      1934,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1930	1934	-	Oct	Sun>=1	0:00	0	S
    new Rule(
      "Regina",
      1930,
      1934,
      10,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1937	1941	-	Apr	Sun>=8	0:00	1:00	D
    new Rule(
      "Regina",
      1937,
      1941,
      4,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1937	only	-	Oct	Sun>=8	0:00	0	S
    new Rule(
      "Regina",
      1937,
      1937,
      10,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1938	only	-	Oct	Sun>=1	0:00	0	S
    new Rule(
      "Regina",
      1938,
      1938,
      10,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1939	1941	-	Oct	Sun>=8	0:00	0	S
    new Rule(
      "Regina",
      1939,
      1941,
      10,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "Regina",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Regina",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Regina	1945	only	-	Sep	lastSun	2:00	0	S
    new Rule("Regina", 1945, 1945, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Regina	1946	only	-	Apr	Sun>=8	2:00	1:00	D
    new Rule(
      "Regina",
      1946,
      1946,
      4,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1946	only	-	Oct	Sun>=8	2:00	0	S
    new Rule(
      "Regina",
      1946,
      1946,
      10,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Regina	1947	1957	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Regina",
      1947,
      1957,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1947	1957	-	Sep	lastSun	2:00	0	S
    new Rule("Regina", 1947, 1957, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Regina	1959	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Regina",
      1959,
      1959,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Regina	1959	only	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Regina",
      1959,
      1959,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Swift	1957	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Swift",
      1957,
      1957,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Swift	1957	only	-	Oct	lastSun	2:00	0	S
    new Rule("Swift", 1957, 1957, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Swift	1959	1961	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Swift",
      1959,
      1961,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Swift	1959	only	-	Oct	lastSun	2:00	0	S
    new Rule("Swift", 1959, 1959, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Swift	1960	1961	-	Sep	lastSun	2:00	0	S
    new Rule("Swift", 1960, 1961, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Edm	1918	1919	-	Apr	Sun>=8	2:00	1:00	D
    new Rule(
      "Edm",
      1918,
      1919,
      4,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Edm	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "Edm",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Edm	1919	only	-	May	27	2:00	0	S
    new Rule(
      "Edm",
      1919,
      1919,
      5,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Edm	1920	1923	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Edm",
      1920,
      1923,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Edm	1920	only	-	Oct	lastSun	2:00	0	S
    new Rule("Edm", 1920, 1920, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Edm	1921	1923	-	Sep	lastSun	2:00	0	S
    new Rule("Edm", 1921, 1923, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Edm	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "Edm",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Edm	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Edm",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Edm	1945	only	-	Sep	lastSun	2:00	0	S
    new Rule("Edm", 1945, 1945, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Edm	1947	only	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Edm",
      1947,
      1947,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Edm	1947	only	-	Sep	lastSun	2:00	0	S
    new Rule("Edm", 1947, 1947, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Edm	1972	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Edm",
      1972,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Edm	1972	2006	-	Oct	lastSun	2:00	0	S
    new Rule("Edm", 1972, 2006, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Vanc	1918	only	-	Apr	14	2:00	1:00	D
    new Rule(
      "Vanc",
      1918,
      1918,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Vanc	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "Vanc",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Vanc	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "Vanc",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Vanc	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Vanc",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Vanc	1945	only	-	Sep	30	2:00	0	S
    new Rule(
      "Vanc",
      1945,
      1945,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Vanc	1946	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Vanc",
      1946,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Vanc	1946	only	-	Sep	29	2:00	0	S
    new Rule(
      "Vanc",
      1946,
      1946,
      9,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Vanc	1947	1961	-	Sep	lastSun	2:00	0	S
    new Rule("Vanc", 1947, 1961, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Vanc	1962	2006	-	Oct	lastSun	2:00	0	S
    new Rule("Vanc", 1962, 2006, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    NT_YK	1918	only	-	Apr	14	2:00	1:00	D
    new Rule(
      "NT_YK",
      1918,
      1918,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NT_YK	1918	only	-	Oct	27	2:00	0	S
    new Rule(
      "NT_YK",
      1918,
      1918,
      10,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    NT_YK	1919	only	-	May	25	2:00	1:00	D
    new Rule(
      "NT_YK",
      1919,
      1919,
      5,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NT_YK	1919	only	-	Nov	 1	0:00	0	S
    new Rule(
      "NT_YK",
      1919,
      1919,
      11,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    NT_YK	1942	only	-	Feb	 9	2:00	1:00	W # War
    new Rule(
      "NT_YK",
      1942,
      1942,
      2,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NT_YK	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "NT_YK",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    NT_YK	1945	only	-	Sep	30	2:00	0	S
    new Rule(
      "NT_YK",
      1945,
      1945,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    NT_YK	1965	only	-	Apr	lastSun	0:00	2:00	DD
    new Rule(
      "NT_YK",
      1965,
      1965,
      4,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    NT_YK	1965	only	-	Oct	lastSun	2:00	0	S
    new Rule("NT_YK", 1965, 1965, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    NT_YK	1980	1986	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "NT_YK",
      1980,
      1986,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    NT_YK	1980	2006	-	Oct	lastSun	2:00	0	S
    new Rule("NT_YK", 1980, 2006, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    NT_YK	1987	2006	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "NT_YK",
      1987,
      2006,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1939	only	-	Feb	5	0:00	1:00	D
    new Rule(
      "Mexico",
      1939,
      1939,
      2,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1939	only	-	Jun	25	0:00	0	S
    new Rule(
      "Mexico",
      1939,
      1939,
      6,
      new DayOfMonth(25),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Mexico	1940	only	-	Dec	9	0:00	1:00	D
    new Rule(
      "Mexico",
      1940,
      1940,
      12,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1941	only	-	Apr	1	0:00	0	S
    new Rule(
      "Mexico",
      1941,
      1941,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Mexico	1943	only	-	Dec	16	0:00	1:00	W # War
    new Rule(
      "Mexico",
      1943,
      1943,
      12,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1944	only	-	May	1	0:00	0	S
    new Rule(
      "Mexico",
      1944,
      1944,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Mexico	1950	only	-	Feb	12	0:00	1:00	D
    new Rule(
      "Mexico",
      1950,
      1950,
      2,
      new DayOfMonth(12),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1950	only	-	Jul	30	0:00	0	S
    new Rule(
      "Mexico",
      1950,
      1950,
      7,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Mexico	1996	2000	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "Mexico",
      1996,
      2000,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	1996	2000	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Mexico",
      1996,
      2000,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Mexico	2001	only	-	May	Sun>=1	2:00	1:00	D
    new Rule(
      "Mexico",
      2001,
      2001,
      5,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	2001	only	-	Sep	lastSun	2:00	0	S
    new Rule("Mexico", 2001, 2001, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Mexico	2002	max	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "Mexico",
      2002,
      -1,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Mexico	2002	max	-	Oct	lastSun	2:00	0	S
    new Rule("Mexico", 2002, -1, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Bahamas	1942	only	-	May	 1	24:00	1:00	W
    new Rule(
      "Bahamas",
      1942,
      1942,
      5,
      new DayOfMonth(1),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bahamas	1944	only	-	Dec	31	24:00	0	S
    new Rule(
      "Bahamas",
      1944,
      1944,
      12,
      new DayOfMonth(31),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bahamas	1945	only	-	Feb	 1	0:00	1:00	W
    new Rule(
      "Bahamas",
      1945,
      1945,
      2,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bahamas	1945	only	-	Aug	14	23:00u	1:00	P # Peace
    new Rule(
      "Bahamas",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Bahamas	1945	only	-	Oct	17	24:00	0	S
    new Rule(
      "Bahamas",
      1945,
      1945,
      10,
      new DayOfMonth(17),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bahamas	1964	1975	-	Oct	lastSun	2:00	0	S
    new Rule(
      "Bahamas",
      1964,
      1975,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bahamas	1964	1975	-	Apr	lastSun	2:00	1:00	D
    new Rule(
      "Bahamas",
      1964,
      1975,
      4,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Barb	1977	only	-	Jun	12	2:00	1:00	D
    new Rule(
      "Barb",
      1977,
      1977,
      6,
      new DayOfMonth(12),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Barb	1977	1978	-	Oct	Sun>=1	2:00	0	S
    new Rule(
      "Barb",
      1977,
      1978,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Barb	1978	1980	-	Apr	Sun>=15	2:00	1:00	D
    new Rule(
      "Barb",
      1978,
      1980,
      4,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Barb	1979	only	-	Sep	30	2:00	0	S
    new Rule(
      "Barb",
      1979,
      1979,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Barb	1980	only	-	Sep	25	2:00	0	S
    new Rule(
      "Barb",
      1980,
      1980,
      9,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belize	1918	1941	-	Oct	Sat>=1	24:00	0:30	-0530
    new Rule(
      "Belize",
      1918,
      1941,
      10,
      new NextDayAfter(6, 1),
      1440,
      AtTimeZone.Local,
      1800000
    ),
    // Rule    Belize	1919	1942	-	Feb	Sat>=8	24:00	0	CST
    new Rule(
      "Belize",
      1919,
      1942,
      2,
      new NextDayAfter(6, 8),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belize	1942	only	-	Jun	27	24:00	1:00	CWT
    new Rule(
      "Belize",
      1942,
      1942,
      6,
      new DayOfMonth(27),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belize	1945	only	-	Aug	14	23:00u	1:00	CPT
    new Rule(
      "Belize",
      1945,
      1945,
      8,
      new DayOfMonth(14),
      1380,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Belize	1945	only	-	Dec	15	24:00	0	CST
    new Rule(
      "Belize",
      1945,
      1945,
      12,
      new DayOfMonth(15),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belize	1947	1967	-	Oct	Sat>=1	24:00	0:30	-0530
    new Rule(
      "Belize",
      1947,
      1967,
      10,
      new NextDayAfter(6, 1),
      1440,
      AtTimeZone.Local,
      1800000
    ),
    // Rule    Belize	1948	1968	-	Feb	Sat>=8	24:00	0	CST
    new Rule(
      "Belize",
      1948,
      1968,
      2,
      new NextDayAfter(6, 8),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belize	1973	only	-	Dec	 5	0:00	1:00	CDT
    new Rule(
      "Belize",
      1973,
      1973,
      12,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belize	1974	only	-	Feb	 9	0:00	0	CST
    new Rule(
      "Belize",
      1974,
      1974,
      2,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belize	1982	only	-	Dec	18	0:00	1:00	CDT
    new Rule(
      "Belize",
      1982,
      1982,
      12,
      new DayOfMonth(18),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belize	1983	only	-	Feb	12	0:00	0	CST
    new Rule(
      "Belize",
      1983,
      1983,
      2,
      new DayOfMonth(12),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1917	only	-	Apr	 5	24:00	1:00	-
    new Rule(
      "Bermuda",
      1917,
      1917,
      4,
      new DayOfMonth(5),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1917	only	-	Sep	30	24:00	0	-
    new Rule(
      "Bermuda",
      1917,
      1917,
      9,
      new DayOfMonth(30),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1918	only	-	Apr	13	24:00	1:00	-
    new Rule(
      "Bermuda",
      1918,
      1918,
      4,
      new DayOfMonth(13),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1918	only	-	Sep	15	24:00	0	S
    new Rule(
      "Bermuda",
      1918,
      1918,
      9,
      new DayOfMonth(15),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1942	only	-	Jan	11	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1942,
      1942,
      1,
      new DayOfMonth(11),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1942	only	-	Oct	18	 2:00	0	S
    new Rule(
      "Bermuda",
      1942,
      1942,
      10,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1943	only	-	Mar	21	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1943,
      1943,
      3,
      new DayOfMonth(21),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1943	only	-	Oct	31	 2:00	0	S
    new Rule(
      "Bermuda",
      1943,
      1943,
      10,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1944	1945	-	Mar	Sun>=8	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1944,
      1945,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1944	1945	-	Nov	Sun>=1	 2:00	0	S
    new Rule(
      "Bermuda",
      1944,
      1945,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1947	only	-	May	Sun>=15	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1947,
      1947,
      5,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1947	only	-	Sep	Sun>=8	 2:00	0	S
    new Rule(
      "Bermuda",
      1947,
      1947,
      9,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1948	1952	-	May	Sun>=22	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1948,
      1952,
      5,
      new NextDayAfter(7, 22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1948	1952	-	Sep	Sun>=1	 2:00	0	S
    new Rule(
      "Bermuda",
      1948,
      1952,
      9,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bermuda	1956	only	-	May	Sun>=22	 2:00	1:00	D
    new Rule(
      "Bermuda",
      1956,
      1956,
      5,
      new NextDayAfter(7, 22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bermuda	1956	only	-	Oct	lastSun	 2:00	0	S
    new Rule(
      "Bermuda",
      1956,
      1956,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    CR	1979	1980	-	Feb	lastSun	0:00	1:00	D
    new Rule("CR", 1979, 1980, 2, new LastDay(7), 0, AtTimeZone.Local, 3600000),
    // Rule    CR	1979	1980	-	Jun	Sun>=1	0:00	0	S
    new Rule(
      "CR",
      1979,
      1980,
      6,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    CR	1991	1992	-	Jan	Sat>=15	0:00	1:00	D
    new Rule(
      "CR",
      1991,
      1992,
      1,
      new NextDayAfter(6, 15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    CR	1991	only	-	Jul	 1	0:00	0	S
    new Rule("CR", 1991, 1991, 7, new DayOfMonth(1), 0, AtTimeZone.Local, 0),
    // Rule    CR	1992	only	-	Mar	15	0:00	0	S
    new Rule("CR", 1992, 1992, 3, new DayOfMonth(15), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1928	only	-	Jun	10	0:00	1:00	D
    new Rule(
      "Cuba",
      1928,
      1928,
      6,
      new DayOfMonth(10),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1928	only	-	Oct	10	0:00	0	S
    new Rule(
      "Cuba",
      1928,
      1928,
      10,
      new DayOfMonth(10),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1940	1942	-	Jun	Sun>=1	0:00	1:00	D
    new Rule(
      "Cuba",
      1940,
      1942,
      6,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1940	1942	-	Sep	Sun>=1	0:00	0	S
    new Rule(
      "Cuba",
      1940,
      1942,
      9,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1945	1946	-	Jun	Sun>=1	0:00	1:00	D
    new Rule(
      "Cuba",
      1945,
      1946,
      6,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1945	1946	-	Sep	Sun>=1	0:00	0	S
    new Rule(
      "Cuba",
      1945,
      1946,
      9,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1965	only	-	Jun	1	0:00	1:00	D
    new Rule(
      "Cuba",
      1965,
      1965,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1965	only	-	Sep	30	0:00	0	S
    new Rule("Cuba", 1965, 1965, 9, new DayOfMonth(30), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1966	only	-	May	29	0:00	1:00	D
    new Rule(
      "Cuba",
      1966,
      1966,
      5,
      new DayOfMonth(29),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1966	only	-	Oct	2	0:00	0	S
    new Rule("Cuba", 1966, 1966, 10, new DayOfMonth(2), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1967	only	-	Apr	8	0:00	1:00	D
    new Rule(
      "Cuba",
      1967,
      1967,
      4,
      new DayOfMonth(8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1967	1968	-	Sep	Sun>=8	0:00	0	S
    new Rule(
      "Cuba",
      1967,
      1968,
      9,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1968	only	-	Apr	14	0:00	1:00	D
    new Rule(
      "Cuba",
      1968,
      1968,
      4,
      new DayOfMonth(14),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1969	1977	-	Apr	lastSun	0:00	1:00	D
    new Rule(
      "Cuba",
      1969,
      1977,
      4,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1969	1971	-	Oct	lastSun	0:00	0	S
    new Rule("Cuba", 1969, 1971, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1972	1974	-	Oct	8	0:00	0	S
    new Rule("Cuba", 1972, 1974, 10, new DayOfMonth(8), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1975	1977	-	Oct	lastSun	0:00	0	S
    new Rule("Cuba", 1975, 1977, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1978	only	-	May	7	0:00	1:00	D
    new Rule(
      "Cuba",
      1978,
      1978,
      5,
      new DayOfMonth(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1978	1990	-	Oct	Sun>=8	0:00	0	S
    new Rule(
      "Cuba",
      1978,
      1990,
      10,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1979	1980	-	Mar	Sun>=15	0:00	1:00	D
    new Rule(
      "Cuba",
      1979,
      1980,
      3,
      new NextDayAfter(7, 15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1981	1985	-	May	Sun>=5	0:00	1:00	D
    new Rule(
      "Cuba",
      1981,
      1985,
      5,
      new NextDayAfter(7, 5),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1986	1989	-	Mar	Sun>=14	0:00	1:00	D
    new Rule(
      "Cuba",
      1986,
      1989,
      3,
      new NextDayAfter(7, 14),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1990	1997	-	Apr	Sun>=1	0:00	1:00	D
    new Rule(
      "Cuba",
      1990,
      1997,
      4,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1991	1995	-	Oct	Sun>=8	0:00s	0	S
    new Rule(
      "Cuba",
      1991,
      1995,
      10,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1996	only	-	Oct	 6	0:00s	0	S
    new Rule("Cuba", 1996, 1996, 10, new DayOfMonth(6), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	1997	only	-	Oct	12	0:00s	0	S
    new Rule(
      "Cuba",
      1997,
      1997,
      10,
      new DayOfMonth(12),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	1998	1999	-	Mar	lastSun	0:00s	1:00	D
    new Rule(
      "Cuba",
      1998,
      1999,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	1998	2003	-	Oct	lastSun	0:00s	0	S
    new Rule("Cuba", 1998, 2003, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	2000	2003	-	Apr	Sun>=1	0:00s	1:00	D
    new Rule(
      "Cuba",
      2000,
      2003,
      4,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2004	only	-	Mar	lastSun	0:00s	1:00	D
    new Rule(
      "Cuba",
      2004,
      2004,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2006	2010	-	Oct	lastSun	0:00s	0	S
    new Rule("Cuba", 2006, 2010, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Cuba	2007	only	-	Mar	Sun>=8	0:00s	1:00	D
    new Rule(
      "Cuba",
      2007,
      2007,
      3,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2008	only	-	Mar	Sun>=15	0:00s	1:00	D
    new Rule(
      "Cuba",
      2008,
      2008,
      3,
      new NextDayAfter(7, 15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2009	2010	-	Mar	Sun>=8	0:00s	1:00	D
    new Rule(
      "Cuba",
      2009,
      2010,
      3,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2011	only	-	Mar	Sun>=15	0:00s	1:00	D
    new Rule(
      "Cuba",
      2011,
      2011,
      3,
      new NextDayAfter(7, 15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2011	only	-	Nov	13	0:00s	0	S
    new Rule(
      "Cuba",
      2011,
      2011,
      11,
      new DayOfMonth(13),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	2012	only	-	Apr	1	0:00s	1:00	D
    new Rule(
      "Cuba",
      2012,
      2012,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Cuba	2012	max	-	Nov	Sun>=1	0:00s	0	S
    new Rule(
      "Cuba",
      2012,
      -1,
      11,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Cuba	2013	max	-	Mar	Sun>=8	0:00s	1:00	D
    new Rule(
      "Cuba",
      2013,
      -1,
      3,
      new NextDayAfter(7, 8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    DR	1966	only	-	Oct	30	0:00	1:00	EDT
    new Rule(
      "DR",
      1966,
      1966,
      10,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    DR	1967	only	-	Feb	28	0:00	0	EST
    new Rule("DR", 1967, 1967, 2, new DayOfMonth(28), 0, AtTimeZone.Local, 0),
    // Rule    DR	1969	1973	-	Oct	lastSun	0:00	0:30	-0430
    new Rule(
      "DR",
      1969,
      1973,
      10,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      1800000
    ),
    // Rule    DR	1970	only	-	Feb	21	0:00	0	EST
    new Rule("DR", 1970, 1970, 2, new DayOfMonth(21), 0, AtTimeZone.Local, 0),
    // Rule    DR	1971	only	-	Jan	20	0:00	0	EST
    new Rule("DR", 1971, 1971, 1, new DayOfMonth(20), 0, AtTimeZone.Local, 0),
    // Rule    DR	1972	1974	-	Jan	21	0:00	0	EST
    new Rule("DR", 1972, 1974, 1, new DayOfMonth(21), 0, AtTimeZone.Local, 0),
    // Rule    Salv	1987	1988	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Salv",
      1987,
      1988,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Salv	1987	1988	-	Sep	lastSun	0:00	0	S
    new Rule("Salv", 1987, 1988, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Guat	1973	only	-	Nov	25	0:00	1:00	D
    new Rule(
      "Guat",
      1973,
      1973,
      11,
      new DayOfMonth(25),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Guat	1974	only	-	Feb	24	0:00	0	S
    new Rule("Guat", 1974, 1974, 2, new DayOfMonth(24), 0, AtTimeZone.Local, 0),
    // Rule    Guat	1983	only	-	May	21	0:00	1:00	D
    new Rule(
      "Guat",
      1983,
      1983,
      5,
      new DayOfMonth(21),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Guat	1983	only	-	Sep	22	0:00	0	S
    new Rule("Guat", 1983, 1983, 9, new DayOfMonth(22), 0, AtTimeZone.Local, 0),
    // Rule    Guat	1991	only	-	Mar	23	0:00	1:00	D
    new Rule(
      "Guat",
      1991,
      1991,
      3,
      new DayOfMonth(23),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Guat	1991	only	-	Sep	 7	0:00	0	S
    new Rule("Guat", 1991, 1991, 9, new DayOfMonth(7), 0, AtTimeZone.Local, 0),
    // Rule    Guat	2006	only	-	Apr	30	0:00	1:00	D
    new Rule(
      "Guat",
      2006,
      2006,
      4,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Guat	2006	only	-	Oct	 1	0:00	0	S
    new Rule("Guat", 2006, 2006, 10, new DayOfMonth(1), 0, AtTimeZone.Local, 0),
    // Rule    Haiti	1983	only	-	May	8	0:00	1:00	D
    new Rule(
      "Haiti",
      1983,
      1983,
      5,
      new DayOfMonth(8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	1984	1987	-	Apr	lastSun	0:00	1:00	D
    new Rule(
      "Haiti",
      1984,
      1987,
      4,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	1983	1987	-	Oct	lastSun	0:00	0	S
    new Rule("Haiti", 1983, 1987, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Haiti	1988	1997	-	Apr	Sun>=1	1:00s	1:00	D
    new Rule(
      "Haiti",
      1988,
      1997,
      4,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	1988	1997	-	Oct	lastSun	1:00s	0	S
    new Rule("Haiti", 1988, 1997, 10, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Haiti	2005	2006	-	Apr	Sun>=1	0:00	1:00	D
    new Rule(
      "Haiti",
      2005,
      2006,
      4,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	2005	2006	-	Oct	lastSun	0:00	0	S
    new Rule("Haiti", 2005, 2006, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Haiti	2012	2015	-	Mar	Sun>=8	2:00	1:00	D
    new Rule(
      "Haiti",
      2012,
      2015,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	2012	2015	-	Nov	Sun>=1	2:00	0	S
    new Rule(
      "Haiti",
      2012,
      2015,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Haiti	2017	max	-	Mar	Sun>=8	2:00	1:00	D
    new Rule(
      "Haiti",
      2017,
      -1,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Haiti	2017	max	-	Nov	Sun>=1	2:00	0	S
    new Rule(
      "Haiti",
      2017,
      -1,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hond	1987	1988	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Hond",
      1987,
      1988,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hond	1987	1988	-	Sep	lastSun	0:00	0	S
    new Rule("Hond", 1987, 1988, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Hond	2006	only	-	May	Sun>=1	0:00	1:00	D
    new Rule(
      "Hond",
      2006,
      2006,
      5,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hond	2006	only	-	Aug	Mon>=1	0:00	0	S
    new Rule(
      "Hond",
      2006,
      2006,
      8,
      new NextDayAfter(1, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Nic	1979	1980	-	Mar	Sun>=16	0:00	1:00	D
    new Rule(
      "Nic",
      1979,
      1980,
      3,
      new NextDayAfter(7, 16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Nic	1979	1980	-	Jun	Mon>=23	0:00	0	S
    new Rule(
      "Nic",
      1979,
      1980,
      6,
      new NextDayAfter(1, 23),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Nic	2005	only	-	Apr	10	0:00	1:00	D
    new Rule(
      "Nic",
      2005,
      2005,
      4,
      new DayOfMonth(10),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Nic	2005	only	-	Oct	Sun>=1	0:00	0	S
    new Rule(
      "Nic",
      2005,
      2005,
      10,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Nic	2006	only	-	Apr	30	2:00	1:00	D
    new Rule(
      "Nic",
      2006,
      2006,
      4,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Nic	2006	only	-	Oct	Sun>=1	1:00	0	S
    new Rule(
      "Nic",
      2006,
      2006,
      10,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1916	only	-	May	21	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1916,
      1916,
      5,
      new DayOfMonth(21),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1916	only	-	Oct	 1	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1916,
      1916,
      10,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1917	only	-	Apr	 8	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1917,
      1917,
      4,
      new DayOfMonth(8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1917	only	-	Sep	17	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1917,
      1917,
      9,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1918	only	-	Mar	24	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1918,
      1918,
      3,
      new DayOfMonth(24),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1918	only	-	Sep	30	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1918,
      1918,
      9,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1919	only	-	Mar	30	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1919,
      1919,
      3,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1919	only	-	Sep	29	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1919,
      1919,
      9,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1920	only	-	Mar	28	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1920,
      1920,
      3,
      new DayOfMonth(28),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1920	only	-	Oct	25	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1920,
      1920,
      10,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1921	only	-	Apr	 3	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1921,
      1921,
      4,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1921	only	-	Oct	 3	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1921,
      1921,
      10,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1922	only	-	Mar	26	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1922,
      1922,
      3,
      new DayOfMonth(26),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1922	only	-	Oct	 8	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1922,
      1922,
      10,
      new DayOfMonth(8),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1923	only	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1923,
      1923,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1923	1924	-	Sep	Sun>=16	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1923,
      1924,
      9,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1924	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1924,
      1924,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1925	1926	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1925,
      1926,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1925	1938	-	Oct	Sun>=2	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1925,
      1938,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1927	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1927,
      1927,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1928	1929	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1928,
      1929,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1930	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1930,
      1930,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1931	1932	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1931,
      1932,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1933	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1933,
      1933,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1934	only	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1934,
      1934,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1935	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1935,
      1935,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1936	1937	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1936,
      1937,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1938	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1938,
      1938,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1939	only	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1939,
      1939,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1939	only	-	Nov	Sun>=16	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1939,
      1939,
      11,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1940	only	-	Feb	Sun>=23	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1940,
      1940,
      2,
      new NextDayAfter(7, 23),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1941	only	-	May	Sun>=2	1:00s	2:00	BDST
    new Rule(
      "GB-Eire",
      1941,
      1941,
      5,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    GB-Eire	1941	1943	-	Aug	Sun>=9	1:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1941,
      1943,
      8,
      new NextDayAfter(7, 9),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1942	1944	-	Apr	Sun>=2	1:00s	2:00	BDST
    new Rule(
      "GB-Eire",
      1942,
      1944,
      4,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    GB-Eire	1944	only	-	Sep	Sun>=16	1:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1944,
      1944,
      9,
      new NextDayAfter(7, 16),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1945	only	-	Apr	Mon>=2	1:00s	2:00	BDST
    new Rule(
      "GB-Eire",
      1945,
      1945,
      4,
      new NextDayAfter(1, 2),
      60,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    GB-Eire	1945	only	-	Jul	Sun>=9	1:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1945,
      1945,
      7,
      new NextDayAfter(7, 9),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1945	1946	-	Oct	Sun>=2	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1945,
      1946,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1946	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1946,
      1946,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1947	only	-	Mar	16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1947,
      1947,
      3,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1947	only	-	Apr	13	1:00s	2:00	BDST
    new Rule(
      "GB-Eire",
      1947,
      1947,
      4,
      new DayOfMonth(13),
      60,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    GB-Eire	1947	only	-	Aug	10	1:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1947,
      1947,
      8,
      new DayOfMonth(10),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1947	only	-	Nov	 2	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1947,
      1947,
      11,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1948	only	-	Mar	14	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1948,
      1948,
      3,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1948	only	-	Oct	31	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1948,
      1948,
      10,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1949	only	-	Apr	 3	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1949,
      1949,
      4,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1949	only	-	Oct	30	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1949,
      1949,
      10,
      new DayOfMonth(30),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1950	1952	-	Apr	Sun>=14	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1950,
      1952,
      4,
      new NextDayAfter(7, 14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1950	1952	-	Oct	Sun>=21	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1950,
      1952,
      10,
      new NextDayAfter(7, 21),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1953	only	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1953,
      1953,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1953	1960	-	Oct	Sun>=2	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1953,
      1960,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1954	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1954,
      1954,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1955	1956	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1955,
      1956,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1957	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1957,
      1957,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1958	1959	-	Apr	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1958,
      1959,
      4,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1960	only	-	Apr	Sun>=9	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1960,
      1960,
      4,
      new NextDayAfter(7, 9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1961	1963	-	Mar	lastSun	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1961,
      1963,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1961	1968	-	Oct	Sun>=23	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1961,
      1968,
      10,
      new NextDayAfter(7, 23),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1964	1967	-	Mar	Sun>=19	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1964,
      1967,
      3,
      new NextDayAfter(7, 19),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1968	only	-	Feb	18	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1968,
      1968,
      2,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1972	1980	-	Mar	Sun>=16	2:00s	1:00	BST
    new Rule(
      "GB-Eire",
      1972,
      1980,
      3,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    GB-Eire	1972	1980	-	Oct	Sun>=23	2:00s	0	GMT
    new Rule(
      "GB-Eire",
      1972,
      1980,
      10,
      new NextDayAfter(7, 23),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    GB-Eire	1981	1995	-	Mar	lastSun	1:00u	1:00	BST
    new Rule(
      "GB-Eire",
      1981,
      1995,
      3,
      new LastDay(7),
      60,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    GB-Eire 1981	1989	-	Oct	Sun>=23	1:00u	0	GMT
    new Rule(
      "GB-Eire",
      1981,
      1989,
      10,
      new NextDayAfter(7, 23),
      60,
      AtTimeZone.UTC,
      0
    ),
    // Rule    GB-Eire 1990	1995	-	Oct	Sun>=22	1:00u	0	GMT
    new Rule(
      "GB-Eire",
      1990,
      1995,
      10,
      new NextDayAfter(7, 22),
      60,
      AtTimeZone.UTC,
      0
    ),
    // Rule    Eire	1971	only	-	Oct	31	 2:00u	-1:00	-
    new Rule(
      "Eire",
      1971,
      1971,
      10,
      new DayOfMonth(31),
      120,
      AtTimeZone.UTC,
      -3600000
    ),
    // Rule    Eire	1972	1980	-	Mar	Sun>=16	 2:00u	0	-
    new Rule(
      "Eire",
      1972,
      1980,
      3,
      new NextDayAfter(7, 16),
      120,
      AtTimeZone.UTC,
      0
    ),
    // Rule    Eire	1972	1980	-	Oct	Sun>=23	 2:00u	-1:00	-
    new Rule(
      "Eire",
      1972,
      1980,
      10,
      new NextDayAfter(7, 23),
      120,
      AtTimeZone.UTC,
      -3600000
    ),
    // Rule    Eire	1981	max	-	Mar	lastSun	 1:00u	0	-
    new Rule("Eire", 1981, -1, 3, new LastDay(7), 60, AtTimeZone.UTC, 0),
    // Rule    Eire	1981	1989	-	Oct	Sun>=23	 1:00u	-1:00	-
    new Rule(
      "Eire",
      1981,
      1989,
      10,
      new NextDayAfter(7, 23),
      60,
      AtTimeZone.UTC,
      -3600000
    ),
    // Rule    Eire	1990	1995	-	Oct	Sun>=22	 1:00u	-1:00	-
    new Rule(
      "Eire",
      1990,
      1995,
      10,
      new NextDayAfter(7, 22),
      60,
      AtTimeZone.UTC,
      -3600000
    ),
    // Rule    Eire	1996	max	-	Oct	lastSun	 1:00u	-1:00	-
    new Rule(
      "Eire",
      1996,
      -1,
      10,
      new LastDay(7),
      60,
      AtTimeZone.UTC,
      -3600000
    ),
    // Rule    EU	1977	1980	-	Apr	Sun>=1	 1:00u	1:00	S
    new Rule(
      "EU",
      1977,
      1980,
      4,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    EU	1977	only	-	Sep	lastSun	 1:00u	0	-
    new Rule("EU", 1977, 1977, 9, new LastDay(7), 60, AtTimeZone.UTC, 0),
    // Rule    EU	1978	only	-	Oct	 1	 1:00u	0	-
    new Rule("EU", 1978, 1978, 10, new DayOfMonth(1), 60, AtTimeZone.UTC, 0),
    // Rule    EU	1979	1995	-	Sep	lastSun	 1:00u	0	-
    new Rule("EU", 1979, 1995, 9, new LastDay(7), 60, AtTimeZone.UTC, 0),
    // Rule    EU	1981	max	-	Mar	lastSun	 1:00u	1:00	S
    new Rule("EU", 1981, -1, 3, new LastDay(7), 60, AtTimeZone.UTC, 3600000),
    // Rule    EU	1996	max	-	Oct	lastSun	 1:00u	0	-
    new Rule("EU", 1996, -1, 10, new LastDay(7), 60, AtTimeZone.UTC, 0),
    // Rule    W-Eur	1977	1980	-	Apr	Sun>=1	 1:00s	1:00	S
    new Rule(
      "W-Eur",
      1977,
      1980,
      4,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    W-Eur	1977	only	-	Sep	lastSun	 1:00s	0	-
    new Rule("W-Eur", 1977, 1977, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    W-Eur	1978	only	-	Oct	 1	 1:00s	0	-
    new Rule(
      "W-Eur",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    W-Eur	1979	1995	-	Sep	lastSun	 1:00s	0	-
    new Rule("W-Eur", 1979, 1995, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    W-Eur	1981	max	-	Mar	lastSun	 1:00s	1:00	S
    new Rule(
      "W-Eur",
      1981,
      -1,
      3,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    W-Eur	1996	max	-	Oct	lastSun	 1:00s	0	-
    new Rule("W-Eur", 1996, -1, 10, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    C-Eur	1916	only	-	Apr	30	23:00	1:00	S
    new Rule(
      "C-Eur",
      1916,
      1916,
      4,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1916	only	-	Oct	 1	 1:00	0	-
    new Rule(
      "C-Eur",
      1916,
      1916,
      10,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1917	1918	-	Apr	Mon>=15	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1917,
      1918,
      4,
      new NextDayAfter(1, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1917	1918	-	Sep	Mon>=15	 2:00s	0	-
    new Rule(
      "C-Eur",
      1917,
      1918,
      9,
      new NextDayAfter(1, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1940	only	-	Apr	 1	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1940,
      1940,
      4,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1942	only	-	Nov	 2	 2:00s	0	-
    new Rule(
      "C-Eur",
      1942,
      1942,
      11,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1943	only	-	Mar	29	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1943,
      1943,
      3,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1943	only	-	Oct	 4	 2:00s	0	-
    new Rule(
      "C-Eur",
      1943,
      1943,
      10,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1944	1945	-	Apr	Mon>=1	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1944,
      1945,
      4,
      new NextDayAfter(1, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1944	only	-	Oct	 2	 2:00s	0	-
    new Rule(
      "C-Eur",
      1944,
      1944,
      10,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1945	only	-	Sep	16	 2:00s	0	-
    new Rule(
      "C-Eur",
      1945,
      1945,
      9,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1977	1980	-	Apr	Sun>=1	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1977,
      1980,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1977	only	-	Sep	lastSun	 2:00s	0	-
    new Rule("C-Eur", 1977, 1977, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    C-Eur	1978	only	-	Oct	 1	 2:00s	0	-
    new Rule(
      "C-Eur",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    C-Eur	1979	1995	-	Sep	lastSun	 2:00s	0	-
    new Rule("C-Eur", 1979, 1995, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    C-Eur	1981	max	-	Mar	lastSun	 2:00s	1:00	S
    new Rule(
      "C-Eur",
      1981,
      -1,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    C-Eur	1996	max	-	Oct	lastSun	 2:00s	0	-
    new Rule("C-Eur", 1996, -1, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    E-Eur	1977	1980	-	Apr	Sun>=1	 0:00	1:00	S
    new Rule(
      "E-Eur",
      1977,
      1980,
      4,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    E-Eur	1977	only	-	Sep	lastSun	 0:00	0	-
    new Rule("E-Eur", 1977, 1977, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    E-Eur	1978	only	-	Oct	 1	 0:00	0	-
    new Rule(
      "E-Eur",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    E-Eur	1979	1995	-	Sep	lastSun	 0:00	0	-
    new Rule("E-Eur", 1979, 1995, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    E-Eur	1981	max	-	Mar	lastSun	 0:00	1:00	S
    new Rule(
      "E-Eur",
      1981,
      -1,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    E-Eur	1996	max	-	Oct	lastSun	 0:00	0	-
    new Rule("E-Eur", 1996, -1, 10, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Russia	1917	only	-	Jul	 1	23:00	1:00	MST  # Moscow Summer Time
    new Rule(
      "Russia",
      1917,
      1917,
      7,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1917	only	-	Dec	28	 0:00	0	MMT  # Moscow Mean Time
    new Rule(
      "Russia",
      1917,
      1917,
      12,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Russia	1918	only	-	May	31	22:00	2:00	MDST # Moscow Double Summer Time
    new Rule(
      "Russia",
      1918,
      1918,
      5,
      new DayOfMonth(31),
      1320,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Russia	1918	only	-	Sep	16	 1:00	1:00	MST
    new Rule(
      "Russia",
      1918,
      1918,
      9,
      new DayOfMonth(16),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1919	only	-	May	31	23:00	2:00	MDST
    new Rule(
      "Russia",
      1919,
      1919,
      5,
      new DayOfMonth(31),
      1380,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Russia	1919	only	-	Jul	 1	 0:00u	1:00	MSD
    new Rule(
      "Russia",
      1919,
      1919,
      7,
      new DayOfMonth(1),
      0,
      AtTimeZone.UTC,
      3600000
    ),
    // Rule    Russia	1919	only	-	Aug	16	 0:00	0	MSK
    new Rule(
      "Russia",
      1919,
      1919,
      8,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Russia	1921	only	-	Feb	14	23:00	1:00	MSD
    new Rule(
      "Russia",
      1921,
      1921,
      2,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1921	only	-	Mar	20	23:00	2:00	+05
    new Rule(
      "Russia",
      1921,
      1921,
      3,
      new DayOfMonth(20),
      1380,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Russia	1921	only	-	Sep	 1	 0:00	1:00	MSD
    new Rule(
      "Russia",
      1921,
      1921,
      9,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1921	only	-	Oct	 1	 0:00	0	-
    new Rule(
      "Russia",
      1921,
      1921,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Russia	1981	1984	-	Apr	 1	 0:00	1:00	S
    new Rule(
      "Russia",
      1981,
      1984,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1981	1983	-	Oct	 1	 0:00	0	-
    new Rule(
      "Russia",
      1981,
      1983,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Russia	1984	1995	-	Sep	lastSun	 2:00s	0	-
    new Rule("Russia", 1984, 1995, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Russia	1985	2010	-	Mar	lastSun	 2:00s	1:00	S
    new Rule(
      "Russia",
      1985,
      2010,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Russia	1996	2010	-	Oct	lastSun	 2:00s	0	-
    new Rule(
      "Russia",
      1996,
      2010,
      10,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1940	only	-	Jun	16	0:00	1:00	S
    new Rule(
      "Albania",
      1940,
      1940,
      6,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1942	only	-	Nov	 2	3:00	0	-
    new Rule(
      "Albania",
      1942,
      1942,
      11,
      new DayOfMonth(2),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1943	only	-	Mar	29	2:00	1:00	S
    new Rule(
      "Albania",
      1943,
      1943,
      3,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1943	only	-	Apr	10	3:00	0	-
    new Rule(
      "Albania",
      1943,
      1943,
      4,
      new DayOfMonth(10),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1974	only	-	May	 4	0:00	1:00	S
    new Rule(
      "Albania",
      1974,
      1974,
      5,
      new DayOfMonth(4),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1974	only	-	Oct	 2	0:00	0	-
    new Rule(
      "Albania",
      1974,
      1974,
      10,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1975	only	-	May	 1	0:00	1:00	S
    new Rule(
      "Albania",
      1975,
      1975,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1975	only	-	Oct	 2	0:00	0	-
    new Rule(
      "Albania",
      1975,
      1975,
      10,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1976	only	-	May	 2	0:00	1:00	S
    new Rule(
      "Albania",
      1976,
      1976,
      5,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1976	only	-	Oct	 3	0:00	0	-
    new Rule(
      "Albania",
      1976,
      1976,
      10,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1977	only	-	May	 8	0:00	1:00	S
    new Rule(
      "Albania",
      1977,
      1977,
      5,
      new DayOfMonth(8),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1977	only	-	Oct	 2	0:00	0	-
    new Rule(
      "Albania",
      1977,
      1977,
      10,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1978	only	-	May	 6	0:00	1:00	S
    new Rule(
      "Albania",
      1978,
      1978,
      5,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1978	only	-	Oct	 1	0:00	0	-
    new Rule(
      "Albania",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1979	only	-	May	 5	0:00	1:00	S
    new Rule(
      "Albania",
      1979,
      1979,
      5,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1979	only	-	Sep	30	0:00	0	-
    new Rule(
      "Albania",
      1979,
      1979,
      9,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1980	only	-	May	 3	0:00	1:00	S
    new Rule(
      "Albania",
      1980,
      1980,
      5,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1980	only	-	Oct	 4	0:00	0	-
    new Rule(
      "Albania",
      1980,
      1980,
      10,
      new DayOfMonth(4),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1981	only	-	Apr	26	0:00	1:00	S
    new Rule(
      "Albania",
      1981,
      1981,
      4,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1981	only	-	Sep	27	0:00	0	-
    new Rule(
      "Albania",
      1981,
      1981,
      9,
      new DayOfMonth(27),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1982	only	-	May	 2	0:00	1:00	S
    new Rule(
      "Albania",
      1982,
      1982,
      5,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1982	only	-	Oct	 3	0:00	0	-
    new Rule(
      "Albania",
      1982,
      1982,
      10,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1983	only	-	Apr	18	0:00	1:00	S
    new Rule(
      "Albania",
      1983,
      1983,
      4,
      new DayOfMonth(18),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Albania	1983	only	-	Oct	 1	0:00	0	-
    new Rule(
      "Albania",
      1983,
      1983,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Albania	1984	only	-	Apr	 1	0:00	1:00	S
    new Rule(
      "Albania",
      1984,
      1984,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1920	only	-	Apr	 5	2:00s	1:00	S
    new Rule(
      "Austria",
      1920,
      1920,
      4,
      new DayOfMonth(5),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1920	only	-	Sep	13	2:00s	0	-
    new Rule(
      "Austria",
      1920,
      1920,
      9,
      new DayOfMonth(13),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Austria	1946	only	-	Apr	14	2:00s	1:00	S
    new Rule(
      "Austria",
      1946,
      1946,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1946	only	-	Oct	 7	2:00s	0	-
    new Rule(
      "Austria",
      1946,
      1946,
      10,
      new DayOfMonth(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Austria	1947	1948	-	Oct	Sun>=1	2:00s	0	-
    new Rule(
      "Austria",
      1947,
      1948,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Austria	1947	only	-	Apr	 6	2:00s	1:00	S
    new Rule(
      "Austria",
      1947,
      1947,
      4,
      new DayOfMonth(6),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1948	only	-	Apr	18	2:00s	1:00	S
    new Rule(
      "Austria",
      1948,
      1948,
      4,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1980	only	-	Apr	 6	0:00	1:00	S
    new Rule(
      "Austria",
      1980,
      1980,
      4,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Austria	1980	only	-	Sep	28	0:00	0	-
    new Rule(
      "Austria",
      1980,
      1980,
      9,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1918	only	-	Mar	 9	 0:00s	1:00	S
    new Rule(
      "Belgium",
      1918,
      1918,
      3,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1918	1919	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Belgium",
      1918,
      1919,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1919	only	-	Mar	 1	23:00s	1:00	S
    new Rule(
      "Belgium",
      1919,
      1919,
      3,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1920	only	-	Feb	14	23:00s	1:00	S
    new Rule(
      "Belgium",
      1920,
      1920,
      2,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1920	only	-	Oct	23	23:00s	0	-
    new Rule(
      "Belgium",
      1920,
      1920,
      10,
      new DayOfMonth(23),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1921	only	-	Mar	14	23:00s	1:00	S
    new Rule(
      "Belgium",
      1921,
      1921,
      3,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1921	only	-	Oct	25	23:00s	0	-
    new Rule(
      "Belgium",
      1921,
      1921,
      10,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1922	only	-	Mar	25	23:00s	1:00	S
    new Rule(
      "Belgium",
      1922,
      1922,
      3,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1922	1927	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Belgium",
      1922,
      1927,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1923	only	-	Apr	21	23:00s	1:00	S
    new Rule(
      "Belgium",
      1923,
      1923,
      4,
      new DayOfMonth(21),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1924	only	-	Mar	29	23:00s	1:00	S
    new Rule(
      "Belgium",
      1924,
      1924,
      3,
      new DayOfMonth(29),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1925	only	-	Apr	 4	23:00s	1:00	S
    new Rule(
      "Belgium",
      1925,
      1925,
      4,
      new DayOfMonth(4),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1926	only	-	Apr	17	23:00s	1:00	S
    new Rule(
      "Belgium",
      1926,
      1926,
      4,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1927	only	-	Apr	 9	23:00s	1:00	S
    new Rule(
      "Belgium",
      1927,
      1927,
      4,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1928	only	-	Apr	14	23:00s	1:00	S
    new Rule(
      "Belgium",
      1928,
      1928,
      4,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1928	1938	-	Oct	Sun>=2	 2:00s	0	-
    new Rule(
      "Belgium",
      1928,
      1938,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1929	only	-	Apr	21	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1929,
      1929,
      4,
      new DayOfMonth(21),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1930	only	-	Apr	13	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1930,
      1930,
      4,
      new DayOfMonth(13),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1931	only	-	Apr	19	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1931,
      1931,
      4,
      new DayOfMonth(19),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1932	only	-	Apr	 3	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1932,
      1932,
      4,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1933	only	-	Mar	26	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1933,
      1933,
      3,
      new DayOfMonth(26),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1934	only	-	Apr	 8	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1934,
      1934,
      4,
      new DayOfMonth(8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1935	only	-	Mar	31	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1935,
      1935,
      3,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1936	only	-	Apr	19	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1936,
      1936,
      4,
      new DayOfMonth(19),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1937	only	-	Apr	 4	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1937,
      1937,
      4,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1938	only	-	Mar	27	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1938,
      1938,
      3,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1939	only	-	Apr	16	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1939,
      1939,
      4,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1939	only	-	Nov	19	 2:00s	0	-
    new Rule(
      "Belgium",
      1939,
      1939,
      11,
      new DayOfMonth(19),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1940	only	-	Feb	25	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1940,
      1940,
      2,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1944	only	-	Sep	17	 2:00s	0	-
    new Rule(
      "Belgium",
      1944,
      1944,
      9,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1945	only	-	Apr	 2	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1945	only	-	Sep	16	 2:00s	0	-
    new Rule(
      "Belgium",
      1945,
      1945,
      9,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Belgium	1946	only	-	May	19	 2:00s	1:00	S
    new Rule(
      "Belgium",
      1946,
      1946,
      5,
      new DayOfMonth(19),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Belgium	1946	only	-	Oct	 7	 2:00s	0	-
    new Rule(
      "Belgium",
      1946,
      1946,
      10,
      new DayOfMonth(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bulg	1979	only	-	Mar	31	23:00	1:00	S
    new Rule(
      "Bulg",
      1979,
      1979,
      3,
      new DayOfMonth(31),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bulg	1979	only	-	Oct	 1	 1:00	0	-
    new Rule(
      "Bulg",
      1979,
      1979,
      10,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bulg	1980	1982	-	Apr	Sat>=1	23:00	1:00	S
    new Rule(
      "Bulg",
      1980,
      1982,
      4,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Bulg	1980	only	-	Sep	29	 1:00	0	-
    new Rule(
      "Bulg",
      1980,
      1980,
      9,
      new DayOfMonth(29),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Bulg	1981	only	-	Sep	27	 2:00	0	-
    new Rule(
      "Bulg",
      1981,
      1981,
      9,
      new DayOfMonth(27),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Czech	1945	only	-	Apr	Mon>=1	2:00s	1:00	S
    new Rule(
      "Czech",
      1945,
      1945,
      4,
      new NextDayAfter(1, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Czech	1945	only	-	Oct	 1	2:00s	0	-
    new Rule(
      "Czech",
      1945,
      1945,
      10,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Czech	1946	only	-	May	 6	2:00s	1:00	S
    new Rule(
      "Czech",
      1946,
      1946,
      5,
      new DayOfMonth(6),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Czech	1946	1949	-	Oct	Sun>=1	2:00s	0	-
    new Rule(
      "Czech",
      1946,
      1949,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Czech	1947	1948	-	Apr	Sun>=15	2:00s	1:00	S
    new Rule(
      "Czech",
      1947,
      1948,
      4,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Czech	1949	only	-	Apr	 9	2:00s	1:00	S
    new Rule(
      "Czech",
      1949,
      1949,
      4,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1916	only	-	May	14	23:00	1:00	S
    new Rule(
      "Denmark",
      1916,
      1916,
      5,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1916	only	-	Sep	30	23:00	0	-
    new Rule(
      "Denmark",
      1916,
      1916,
      9,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denmark	1940	only	-	May	15	 0:00	1:00	S
    new Rule(
      "Denmark",
      1940,
      1940,
      5,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1945	only	-	Apr	 2	 2:00s	1:00	S
    new Rule(
      "Denmark",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1945	only	-	Aug	15	 2:00s	0	-
    new Rule(
      "Denmark",
      1945,
      1945,
      8,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denmark	1946	only	-	May	 1	 2:00s	1:00	S
    new Rule(
      "Denmark",
      1946,
      1946,
      5,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1946	only	-	Sep	 1	 2:00s	0	-
    new Rule(
      "Denmark",
      1946,
      1946,
      9,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denmark	1947	only	-	May	 4	 2:00s	1:00	S
    new Rule(
      "Denmark",
      1947,
      1947,
      5,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1947	only	-	Aug	10	 2:00s	0	-
    new Rule(
      "Denmark",
      1947,
      1947,
      8,
      new DayOfMonth(10),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Denmark	1948	only	-	May	 9	 2:00s	1:00	S
    new Rule(
      "Denmark",
      1948,
      1948,
      5,
      new DayOfMonth(9),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Denmark	1948	only	-	Aug	 8	 2:00s	0	-
    new Rule(
      "Denmark",
      1948,
      1948,
      8,
      new DayOfMonth(8),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Thule	1991	1992	-	Mar	lastSun	2:00	1:00	D
    new Rule(
      "Thule",
      1991,
      1992,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Thule	1991	1992	-	Sep	lastSun	2:00	0	S
    new Rule("Thule", 1991, 1992, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Thule	1993	2006	-	Apr	Sun>=1	2:00	1:00	D
    new Rule(
      "Thule",
      1993,
      2006,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Thule	1993	2006	-	Oct	lastSun	2:00	0	S
    new Rule("Thule", 1993, 2006, 10, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Thule	2007	max	-	Mar	Sun>=8	2:00	1:00	D
    new Rule(
      "Thule",
      2007,
      -1,
      3,
      new NextDayAfter(7, 8),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Thule	2007	max	-	Nov	Sun>=1	2:00	0	S
    new Rule(
      "Thule",
      2007,
      -1,
      11,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Finland	1942	only	-	Apr	2	24:00	1:00	S
    new Rule(
      "Finland",
      1942,
      1942,
      4,
      new DayOfMonth(2),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Finland	1942	only	-	Oct	4	1:00	0	-
    new Rule(
      "Finland",
      1942,
      1942,
      10,
      new DayOfMonth(4),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Finland	1981	1982	-	Mar	lastSun	2:00	1:00	S
    new Rule(
      "Finland",
      1981,
      1982,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Finland	1981	1982	-	Sep	lastSun	3:00	0	-
    new Rule(
      "Finland",
      1981,
      1982,
      9,
      new LastDay(7),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1916	only	-	Jun	14	23:00s	1:00	S
    new Rule(
      "France",
      1916,
      1916,
      6,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1916	1919	-	Oct	Sun>=1	23:00s	0	-
    new Rule(
      "France",
      1916,
      1919,
      10,
      new NextDayAfter(7, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1917	only	-	Mar	24	23:00s	1:00	S
    new Rule(
      "France",
      1917,
      1917,
      3,
      new DayOfMonth(24),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1918	only	-	Mar	 9	23:00s	1:00	S
    new Rule(
      "France",
      1918,
      1918,
      3,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1919	only	-	Mar	 1	23:00s	1:00	S
    new Rule(
      "France",
      1919,
      1919,
      3,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1920	only	-	Feb	14	23:00s	1:00	S
    new Rule(
      "France",
      1920,
      1920,
      2,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1920	only	-	Oct	23	23:00s	0	-
    new Rule(
      "France",
      1920,
      1920,
      10,
      new DayOfMonth(23),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1921	only	-	Mar	14	23:00s	1:00	S
    new Rule(
      "France",
      1921,
      1921,
      3,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1921	only	-	Oct	25	23:00s	0	-
    new Rule(
      "France",
      1921,
      1921,
      10,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1922	only	-	Mar	25	23:00s	1:00	S
    new Rule(
      "France",
      1922,
      1922,
      3,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1922	1938	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "France",
      1922,
      1938,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1923	only	-	May	26	23:00s	1:00	S
    new Rule(
      "France",
      1923,
      1923,
      5,
      new DayOfMonth(26),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1924	only	-	Mar	29	23:00s	1:00	S
    new Rule(
      "France",
      1924,
      1924,
      3,
      new DayOfMonth(29),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1925	only	-	Apr	 4	23:00s	1:00	S
    new Rule(
      "France",
      1925,
      1925,
      4,
      new DayOfMonth(4),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1926	only	-	Apr	17	23:00s	1:00	S
    new Rule(
      "France",
      1926,
      1926,
      4,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1927	only	-	Apr	 9	23:00s	1:00	S
    new Rule(
      "France",
      1927,
      1927,
      4,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1928	only	-	Apr	14	23:00s	1:00	S
    new Rule(
      "France",
      1928,
      1928,
      4,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1929	only	-	Apr	20	23:00s	1:00	S
    new Rule(
      "France",
      1929,
      1929,
      4,
      new DayOfMonth(20),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1930	only	-	Apr	12	23:00s	1:00	S
    new Rule(
      "France",
      1930,
      1930,
      4,
      new DayOfMonth(12),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1931	only	-	Apr	18	23:00s	1:00	S
    new Rule(
      "France",
      1931,
      1931,
      4,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1932	only	-	Apr	 2	23:00s	1:00	S
    new Rule(
      "France",
      1932,
      1932,
      4,
      new DayOfMonth(2),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1933	only	-	Mar	25	23:00s	1:00	S
    new Rule(
      "France",
      1933,
      1933,
      3,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1934	only	-	Apr	 7	23:00s	1:00	S
    new Rule(
      "France",
      1934,
      1934,
      4,
      new DayOfMonth(7),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1935	only	-	Mar	30	23:00s	1:00	S
    new Rule(
      "France",
      1935,
      1935,
      3,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1936	only	-	Apr	18	23:00s	1:00	S
    new Rule(
      "France",
      1936,
      1936,
      4,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1937	only	-	Apr	 3	23:00s	1:00	S
    new Rule(
      "France",
      1937,
      1937,
      4,
      new DayOfMonth(3),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1938	only	-	Mar	26	23:00s	1:00	S
    new Rule(
      "France",
      1938,
      1938,
      3,
      new DayOfMonth(26),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1939	only	-	Apr	15	23:00s	1:00	S
    new Rule(
      "France",
      1939,
      1939,
      4,
      new DayOfMonth(15),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1939	only	-	Nov	18	23:00s	0	-
    new Rule(
      "France",
      1939,
      1939,
      11,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1940	only	-	Feb	25	 2:00	1:00	S
    new Rule(
      "France",
      1940,
      1940,
      2,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1941	only	-	May	 5	 0:00	2:00	M # Midsummer
    new Rule(
      "France",
      1941,
      1941,
      5,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    France	1941	only	-	Oct	 6	 0:00	1:00	S
    new Rule(
      "France",
      1941,
      1941,
      10,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1942	only	-	Mar	 9	 0:00	2:00	M
    new Rule(
      "France",
      1942,
      1942,
      3,
      new DayOfMonth(9),
      0,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    France	1942	only	-	Nov	 2	 3:00	1:00	S
    new Rule(
      "France",
      1942,
      1942,
      11,
      new DayOfMonth(2),
      180,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1943	only	-	Mar	29	 2:00	2:00	M
    new Rule(
      "France",
      1943,
      1943,
      3,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    France	1943	only	-	Oct	 4	 3:00	1:00	S
    new Rule(
      "France",
      1943,
      1943,
      10,
      new DayOfMonth(4),
      180,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1944	only	-	Apr	 3	 2:00	2:00	M
    new Rule(
      "France",
      1944,
      1944,
      4,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    France	1944	only	-	Oct	 8	 1:00	1:00	S
    new Rule(
      "France",
      1944,
      1944,
      10,
      new DayOfMonth(8),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1945	only	-	Apr	 2	 2:00	2:00	M
    new Rule(
      "France",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    France	1945	only	-	Sep	16	 3:00	0	-
    new Rule(
      "France",
      1945,
      1945,
      9,
      new DayOfMonth(16),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    France	1976	only	-	Mar	28	 1:00	1:00	S
    new Rule(
      "France",
      1976,
      1976,
      3,
      new DayOfMonth(28),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    France	1976	only	-	Sep	26	 1:00	0	-
    new Rule(
      "France",
      1976,
      1976,
      9,
      new DayOfMonth(26),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Germany	1946	only	-	Apr	14	2:00s	1:00	S
    new Rule(
      "Germany",
      1946,
      1946,
      4,
      new DayOfMonth(14),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Germany	1946	only	-	Oct	 7	2:00s	0	-
    new Rule(
      "Germany",
      1946,
      1946,
      10,
      new DayOfMonth(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Germany	1947	1949	-	Oct	Sun>=1	2:00s	0	-
    new Rule(
      "Germany",
      1947,
      1949,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Germany	1947	only	-	Apr	 6	3:00s	1:00	S
    new Rule(
      "Germany",
      1947,
      1947,
      4,
      new DayOfMonth(6),
      180,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Germany	1947	only	-	May	11	2:00s	2:00	M
    new Rule(
      "Germany",
      1947,
      1947,
      5,
      new DayOfMonth(11),
      120,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Germany	1947	only	-	Jun	29	3:00	1:00	S
    new Rule(
      "Germany",
      1947,
      1947,
      6,
      new DayOfMonth(29),
      180,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Germany	1948	only	-	Apr	18	2:00s	1:00	S
    new Rule(
      "Germany",
      1948,
      1948,
      4,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Germany	1949	only	-	Apr	10	2:00s	1:00	S
    new Rule(
      "Germany",
      1949,
      1949,
      4,
      new DayOfMonth(10),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SovietZone    1945	only	-	May	24	2:00	2:00	M # Midsummer
    new Rule(
      "SovietZone",
      1945,
      1945,
      5,
      new DayOfMonth(24),
      120,
      AtTimeZone.Local,
      7200000
    ),
    // Rule SovietZone    1945	only	-	Sep	24	3:00	1:00	S
    new Rule(
      "SovietZone",
      1945,
      1945,
      9,
      new DayOfMonth(24),
      180,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SovietZone    1945	only	-	Nov	18	2:00s	0	-
    new Rule(
      "SovietZone",
      1945,
      1945,
      11,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1932	only	-	Jul	 7	0:00	1:00	S
    new Rule(
      "Greece",
      1932,
      1932,
      7,
      new DayOfMonth(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1932	only	-	Sep	 1	0:00	0	-
    new Rule(
      "Greece",
      1932,
      1932,
      9,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1941	only	-	Apr	 7	0:00	1:00	S
    new Rule(
      "Greece",
      1941,
      1941,
      4,
      new DayOfMonth(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1942	only	-	Nov	 2	3:00	0	-
    new Rule(
      "Greece",
      1942,
      1942,
      11,
      new DayOfMonth(2),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1943	only	-	Mar	30	0:00	1:00	S
    new Rule(
      "Greece",
      1943,
      1943,
      3,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1943	only	-	Oct	 4	0:00	0	-
    new Rule(
      "Greece",
      1943,
      1943,
      10,
      new DayOfMonth(4),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1952	only	-	Jul	 1	0:00	1:00	S
    new Rule(
      "Greece",
      1952,
      1952,
      7,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1952	only	-	Nov	 2	0:00	0	-
    new Rule(
      "Greece",
      1952,
      1952,
      11,
      new DayOfMonth(2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1975	only	-	Apr	12	0:00s	1:00	S
    new Rule(
      "Greece",
      1975,
      1975,
      4,
      new DayOfMonth(12),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1975	only	-	Nov	26	0:00s	0	-
    new Rule(
      "Greece",
      1975,
      1975,
      11,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1976	only	-	Apr	11	2:00s	1:00	S
    new Rule(
      "Greece",
      1976,
      1976,
      4,
      new DayOfMonth(11),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1976	only	-	Oct	10	2:00s	0	-
    new Rule(
      "Greece",
      1976,
      1976,
      10,
      new DayOfMonth(10),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1977	1978	-	Apr	Sun>=1	2:00s	1:00	S
    new Rule(
      "Greece",
      1977,
      1978,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1977	only	-	Sep	26	2:00s	0	-
    new Rule(
      "Greece",
      1977,
      1977,
      9,
      new DayOfMonth(26),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1978	only	-	Sep	24	4:00	0	-
    new Rule(
      "Greece",
      1978,
      1978,
      9,
      new DayOfMonth(24),
      240,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1979	only	-	Apr	 1	9:00	1:00	S
    new Rule(
      "Greece",
      1979,
      1979,
      4,
      new DayOfMonth(1),
      540,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1979	only	-	Sep	29	2:00	0	-
    new Rule(
      "Greece",
      1979,
      1979,
      9,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Greece	1980	only	-	Apr	 1	0:00	1:00	S
    new Rule(
      "Greece",
      1980,
      1980,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Greece	1980	only	-	Sep	28	0:00	0	-
    new Rule(
      "Greece",
      1980,
      1980,
      9,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1918	1919	-	Apr	15	 2:00	1:00	S
    new Rule(
      "Hungary",
      1918,
      1919,
      4,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1918	1920	-	Sep	Mon>=15	 3:00	0	-
    new Rule(
      "Hungary",
      1918,
      1920,
      9,
      new NextDayAfter(1, 15),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1920	only	-	Apr	 5	 2:00	1:00	S
    new Rule(
      "Hungary",
      1920,
      1920,
      4,
      new DayOfMonth(5),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1945	only	-	May	 1	23:00	1:00	S
    new Rule(
      "Hungary",
      1945,
      1945,
      5,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1945	only	-	Nov	 1	 1:00	0	-
    new Rule(
      "Hungary",
      1945,
      1945,
      11,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1946	only	-	Mar	31	 2:00s	1:00	S
    new Rule(
      "Hungary",
      1946,
      1946,
      3,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1946	only	-	Oct	 7	 2:00	0	-
    new Rule(
      "Hungary",
      1946,
      1946,
      10,
      new DayOfMonth(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1947	1949	-	Apr	Sun>=4	 2:00s	1:00	S
    new Rule(
      "Hungary",
      1947,
      1949,
      4,
      new NextDayAfter(7, 4),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1947	1949	-	Oct	Sun>=1	 2:00s	0	-
    new Rule(
      "Hungary",
      1947,
      1949,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1954	only	-	May	23	 0:00	1:00	S
    new Rule(
      "Hungary",
      1954,
      1954,
      5,
      new DayOfMonth(23),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1954	only	-	Oct	 3	 0:00	0	-
    new Rule(
      "Hungary",
      1954,
      1954,
      10,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1955	only	-	May	22	 2:00	1:00	S
    new Rule(
      "Hungary",
      1955,
      1955,
      5,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1955	only	-	Oct	 2	 3:00	0	-
    new Rule(
      "Hungary",
      1955,
      1955,
      10,
      new DayOfMonth(2),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1956	1957	-	Jun	Sun>=1	 2:00	1:00	S
    new Rule(
      "Hungary",
      1956,
      1957,
      6,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1956	1957	-	Sep	lastSun	 3:00	0	-
    new Rule(
      "Hungary",
      1956,
      1957,
      9,
      new LastDay(7),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1980	only	-	Apr	 6	 0:00	1:00	S
    new Rule(
      "Hungary",
      1980,
      1980,
      4,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1980	only	-	Sep	28	 1:00	0	-
    new Rule(
      "Hungary",
      1980,
      1980,
      9,
      new DayOfMonth(28),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Hungary	1981	1983	-	Mar	lastSun	 0:00	1:00	S
    new Rule(
      "Hungary",
      1981,
      1983,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Hungary	1981	1983	-	Sep	lastSun	 1:00	0	-
    new Rule("Hungary", 1981, 1983, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Iceland	1917	1919	-	Feb	19	23:00	1:00	-
    new Rule(
      "Iceland",
      1917,
      1919,
      2,
      new DayOfMonth(19),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1917	only	-	Oct	21	 1:00	0	-
    new Rule(
      "Iceland",
      1917,
      1917,
      10,
      new DayOfMonth(21),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1918	1919	-	Nov	16	 1:00	0	-
    new Rule(
      "Iceland",
      1918,
      1919,
      11,
      new DayOfMonth(16),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1921	only	-	Mar	19	23:00	1:00	-
    new Rule(
      "Iceland",
      1921,
      1921,
      3,
      new DayOfMonth(19),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1921	only	-	Jun	23	 1:00	0	-
    new Rule(
      "Iceland",
      1921,
      1921,
      6,
      new DayOfMonth(23),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1939	only	-	Apr	29	23:00	1:00	-
    new Rule(
      "Iceland",
      1939,
      1939,
      4,
      new DayOfMonth(29),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1939	only	-	Oct	29	 2:00	0	-
    new Rule(
      "Iceland",
      1939,
      1939,
      10,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1940	only	-	Feb	25	 2:00	1:00	-
    new Rule(
      "Iceland",
      1940,
      1940,
      2,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1940	1941	-	Nov	Sun>=2	 1:00s	0	-
    new Rule(
      "Iceland",
      1940,
      1941,
      11,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1941	1942	-	Mar	Sun>=2	 1:00s	1:00	-
    new Rule(
      "Iceland",
      1941,
      1942,
      3,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1943	1946	-	Mar	Sun>=1	 1:00s	1:00	-
    new Rule(
      "Iceland",
      1943,
      1946,
      3,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1942	1948	-	Oct	Sun>=22	 1:00s	0	-
    new Rule(
      "Iceland",
      1942,
      1948,
      10,
      new NextDayAfter(7, 22),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1947	1967	-	Apr	Sun>=1	 1:00s	1:00	-
    new Rule(
      "Iceland",
      1947,
      1967,
      4,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Iceland	1949	only	-	Oct	30	 1:00s	0	-
    new Rule(
      "Iceland",
      1949,
      1949,
      10,
      new DayOfMonth(30),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1950	1966	-	Oct	Sun>=22	 1:00s	0	-
    new Rule(
      "Iceland",
      1950,
      1966,
      10,
      new NextDayAfter(7, 22),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Iceland	1967	only	-	Oct	29	 1:00s	0	-
    new Rule(
      "Iceland",
      1967,
      1967,
      10,
      new DayOfMonth(29),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1916	only	-	Jun	 3	24:00	1:00	S
    new Rule(
      "Italy",
      1916,
      1916,
      6,
      new DayOfMonth(3),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1916	1917	-	Sep	30	24:00	0	-
    new Rule(
      "Italy",
      1916,
      1917,
      9,
      new DayOfMonth(30),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1917	only	-	Mar	31	24:00	1:00	S
    new Rule(
      "Italy",
      1917,
      1917,
      3,
      new DayOfMonth(31),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1918	only	-	Mar	 9	24:00	1:00	S
    new Rule(
      "Italy",
      1918,
      1918,
      3,
      new DayOfMonth(9),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1918	only	-	Oct	 6	24:00	0	-
    new Rule(
      "Italy",
      1918,
      1918,
      10,
      new DayOfMonth(6),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1919	only	-	Mar	 1	24:00	1:00	S
    new Rule(
      "Italy",
      1919,
      1919,
      3,
      new DayOfMonth(1),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1919	only	-	Oct	 4	24:00	0	-
    new Rule(
      "Italy",
      1919,
      1919,
      10,
      new DayOfMonth(4),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1920	only	-	Mar	20	24:00	1:00	S
    new Rule(
      "Italy",
      1920,
      1920,
      3,
      new DayOfMonth(20),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1920	only	-	Sep	18	24:00	0	-
    new Rule(
      "Italy",
      1920,
      1920,
      9,
      new DayOfMonth(18),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1940	only	-	Jun	14	24:00	1:00	S
    new Rule(
      "Italy",
      1940,
      1940,
      6,
      new DayOfMonth(14),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1942	only	-	Nov	 2	 2:00s	0	-
    new Rule(
      "Italy",
      1942,
      1942,
      11,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1943	only	-	Mar	29	 2:00s	1:00	S
    new Rule(
      "Italy",
      1943,
      1943,
      3,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1943	only	-	Oct	 4	 2:00s	0	-
    new Rule(
      "Italy",
      1943,
      1943,
      10,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1944	only	-	Apr	 2	 2:00s	1:00	S
    new Rule(
      "Italy",
      1944,
      1944,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1944	only	-	Sep	17	 2:00s	0	-
    new Rule(
      "Italy",
      1944,
      1944,
      9,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1945	only	-	Apr	 2	 2:00	1:00	S
    new Rule(
      "Italy",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1945	only	-	Sep	15	 1:00	0	-
    new Rule(
      "Italy",
      1945,
      1945,
      9,
      new DayOfMonth(15),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1946	only	-	Mar	17	 2:00s	1:00	S
    new Rule(
      "Italy",
      1946,
      1946,
      3,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1946	only	-	Oct	 6	 2:00s	0	-
    new Rule(
      "Italy",
      1946,
      1946,
      10,
      new DayOfMonth(6),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1947	only	-	Mar	16	 0:00s	1:00	S
    new Rule(
      "Italy",
      1947,
      1947,
      3,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1947	only	-	Oct	 5	 0:00s	0	-
    new Rule(
      "Italy",
      1947,
      1947,
      10,
      new DayOfMonth(5),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1948	only	-	Feb	29	 2:00s	1:00	S
    new Rule(
      "Italy",
      1948,
      1948,
      2,
      new DayOfMonth(29),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1948	only	-	Oct	 3	 2:00s	0	-
    new Rule(
      "Italy",
      1948,
      1948,
      10,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1966	1968	-	May	Sun>=22	 0:00s	1:00	S
    new Rule(
      "Italy",
      1966,
      1968,
      5,
      new NextDayAfter(7, 22),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1966	only	-	Sep	24	24:00	0	-
    new Rule(
      "Italy",
      1966,
      1966,
      9,
      new DayOfMonth(24),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1967	1969	-	Sep	Sun>=22	 0:00s	0	-
    new Rule(
      "Italy",
      1967,
      1969,
      9,
      new NextDayAfter(7, 22),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1969	only	-	Jun	 1	 0:00s	1:00	S
    new Rule(
      "Italy",
      1969,
      1969,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1970	only	-	May	31	 0:00s	1:00	S
    new Rule(
      "Italy",
      1970,
      1970,
      5,
      new DayOfMonth(31),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1970	only	-	Sep	lastSun	 0:00s	0	-
    new Rule("Italy", 1970, 1970, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Italy	1971	1972	-	May	Sun>=22	 0:00s	1:00	S
    new Rule(
      "Italy",
      1971,
      1972,
      5,
      new NextDayAfter(7, 22),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1971	only	-	Sep	lastSun	 0:00s	0	-
    new Rule("Italy", 1971, 1971, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Italy	1972	only	-	Oct	 1	 0:00s	0	-
    new Rule(
      "Italy",
      1972,
      1972,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1973	only	-	Jun	 3	 0:00s	1:00	S
    new Rule(
      "Italy",
      1973,
      1973,
      6,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1973	1974	-	Sep	lastSun	 0:00s	0	-
    new Rule("Italy", 1973, 1974, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Italy	1974	only	-	May	26	 0:00s	1:00	S
    new Rule(
      "Italy",
      1974,
      1974,
      5,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1975	only	-	Jun	 1	 0:00s	1:00	S
    new Rule(
      "Italy",
      1975,
      1975,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1975	1977	-	Sep	lastSun	 0:00s	0	-
    new Rule("Italy", 1975, 1977, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Italy	1976	only	-	May	30	 0:00s	1:00	S
    new Rule(
      "Italy",
      1976,
      1976,
      5,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1977	1979	-	May	Sun>=22	 0:00s	1:00	S
    new Rule(
      "Italy",
      1977,
      1979,
      5,
      new NextDayAfter(7, 22),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Italy	1978	only	-	Oct	 1	 0:00s	0	-
    new Rule(
      "Italy",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Italy	1979	only	-	Sep	30	 0:00s	0	-
    new Rule(
      "Italy",
      1979,
      1979,
      9,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Latvia	1989	1996	-	Mar	lastSun	 2:00s	1:00	S
    new Rule(
      "Latvia",
      1989,
      1996,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Latvia	1989	1996	-	Sep	lastSun	 2:00s	0	-
    new Rule("Latvia", 1989, 1996, 9, new LastDay(7), 120, AtTimeZone.Local, 0),
    // Rule    Lux	1916	only	-	May	14	23:00	1:00	S
    new Rule(
      "Lux",
      1916,
      1916,
      5,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1916	only	-	Oct	 1	 1:00	0	-
    new Rule("Lux", 1916, 1916, 10, new DayOfMonth(1), 60, AtTimeZone.Local, 0),
    // Rule    Lux	1917	only	-	Apr	28	23:00	1:00	S
    new Rule(
      "Lux",
      1917,
      1917,
      4,
      new DayOfMonth(28),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1917	only	-	Sep	17	 1:00	0	-
    new Rule("Lux", 1917, 1917, 9, new DayOfMonth(17), 60, AtTimeZone.Local, 0),
    // Rule    Lux	1918	only	-	Apr	Mon>=15	 2:00s	1:00	S
    new Rule(
      "Lux",
      1918,
      1918,
      4,
      new NextDayAfter(1, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1918	only	-	Sep	Mon>=15	 2:00s	0	-
    new Rule(
      "Lux",
      1918,
      1918,
      9,
      new NextDayAfter(1, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1919	only	-	Mar	 1	23:00	1:00	S
    new Rule(
      "Lux",
      1919,
      1919,
      3,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1919	only	-	Oct	 5	 3:00	0	-
    new Rule(
      "Lux",
      1919,
      1919,
      10,
      new DayOfMonth(5),
      180,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1920	only	-	Feb	14	23:00	1:00	S
    new Rule(
      "Lux",
      1920,
      1920,
      2,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1920	only	-	Oct	24	 2:00	0	-
    new Rule(
      "Lux",
      1920,
      1920,
      10,
      new DayOfMonth(24),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1921	only	-	Mar	14	23:00	1:00	S
    new Rule(
      "Lux",
      1921,
      1921,
      3,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1921	only	-	Oct	26	 2:00	0	-
    new Rule(
      "Lux",
      1921,
      1921,
      10,
      new DayOfMonth(26),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1922	only	-	Mar	25	23:00	1:00	S
    new Rule(
      "Lux",
      1922,
      1922,
      3,
      new DayOfMonth(25),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1922	only	-	Oct	Sun>=2	 1:00	0	-
    new Rule(
      "Lux",
      1922,
      1922,
      10,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1923	only	-	Apr	21	23:00	1:00	S
    new Rule(
      "Lux",
      1923,
      1923,
      4,
      new DayOfMonth(21),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1923	only	-	Oct	Sun>=2	 2:00	0	-
    new Rule(
      "Lux",
      1923,
      1923,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1924	only	-	Mar	29	23:00	1:00	S
    new Rule(
      "Lux",
      1924,
      1924,
      3,
      new DayOfMonth(29),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1924	1928	-	Oct	Sun>=2	 1:00	0	-
    new Rule(
      "Lux",
      1924,
      1928,
      10,
      new NextDayAfter(7, 2),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Lux	1925	only	-	Apr	 5	23:00	1:00	S
    new Rule(
      "Lux",
      1925,
      1925,
      4,
      new DayOfMonth(5),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1926	only	-	Apr	17	23:00	1:00	S
    new Rule(
      "Lux",
      1926,
      1926,
      4,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1927	only	-	Apr	 9	23:00	1:00	S
    new Rule(
      "Lux",
      1927,
      1927,
      4,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1928	only	-	Apr	14	23:00	1:00	S
    new Rule(
      "Lux",
      1928,
      1928,
      4,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Lux	1929	only	-	Apr	20	23:00	1:00	S
    new Rule(
      "Lux",
      1929,
      1929,
      4,
      new DayOfMonth(20),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Malta	1973	only	-	Mar	31	0:00s	1:00	S
    new Rule(
      "Malta",
      1973,
      1973,
      3,
      new DayOfMonth(31),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Malta	1973	only	-	Sep	29	0:00s	0	-
    new Rule(
      "Malta",
      1973,
      1973,
      9,
      new DayOfMonth(29),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Malta	1974	only	-	Apr	21	0:00s	1:00	S
    new Rule(
      "Malta",
      1974,
      1974,
      4,
      new DayOfMonth(21),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Malta	1974	only	-	Sep	16	0:00s	0	-
    new Rule(
      "Malta",
      1974,
      1974,
      9,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Malta	1975	1979	-	Apr	Sun>=15	2:00	1:00	S
    new Rule(
      "Malta",
      1975,
      1979,
      4,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Malta	1975	1980	-	Sep	Sun>=15	2:00	0	-
    new Rule(
      "Malta",
      1975,
      1980,
      9,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Malta	1980	only	-	Mar	31	2:00	1:00	S
    new Rule(
      "Malta",
      1980,
      1980,
      3,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moldova	1997	max	-	Mar	lastSun	 2:00	1:00	S
    new Rule(
      "Moldova",
      1997,
      -1,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Moldova	1997	max	-	Oct	lastSun	 3:00	0	-
    new Rule("Moldova", 1997, -1, 10, new LastDay(7), 180, AtTimeZone.Local, 0),
    // Rule    Neth	1916	only	-	May	 1	0:00	1:00	NST	# Netherlands Summer Time
    new Rule(
      "Neth",
      1916,
      1916,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1916	only	-	Oct	 1	0:00	0	AMT	# Amsterdam Mean Time
    new Rule("Neth", 1916, 1916, 10, new DayOfMonth(1), 0, AtTimeZone.Local, 0),
    // Rule    Neth	1917	only	-	Apr	16	2:00s	1:00	NST
    new Rule(
      "Neth",
      1917,
      1917,
      4,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1917	only	-	Sep	17	2:00s	0	AMT
    new Rule(
      "Neth",
      1917,
      1917,
      9,
      new DayOfMonth(17),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Neth	1918	1921	-	Apr	Mon>=1	2:00s	1:00	NST
    new Rule(
      "Neth",
      1918,
      1921,
      4,
      new NextDayAfter(1, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1918	1921	-	Sep	lastMon	2:00s	0	AMT
    new Rule("Neth", 1918, 1921, 9, new LastDay(1), 120, AtTimeZone.Local, 0),
    // Rule    Neth	1922	only	-	Mar	lastSun	2:00s	1:00	NST
    new Rule(
      "Neth",
      1922,
      1922,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1922	1936	-	Oct	Sun>=2	2:00s	0	AMT
    new Rule(
      "Neth",
      1922,
      1936,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Neth	1923	only	-	Jun	Fri>=1	2:00s	1:00	NST
    new Rule(
      "Neth",
      1923,
      1923,
      6,
      new NextDayAfter(5, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1924	only	-	Mar	lastSun	2:00s	1:00	NST
    new Rule(
      "Neth",
      1924,
      1924,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1925	only	-	Jun	Fri>=1	2:00s	1:00	NST
    new Rule(
      "Neth",
      1925,
      1925,
      6,
      new NextDayAfter(5, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1926	1931	-	May	15	2:00s	1:00	NST
    new Rule(
      "Neth",
      1926,
      1931,
      5,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1932	only	-	May	22	2:00s	1:00	NST
    new Rule(
      "Neth",
      1932,
      1932,
      5,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1933	1936	-	May	15	2:00s	1:00	NST
    new Rule(
      "Neth",
      1933,
      1936,
      5,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1937	only	-	May	22	2:00s	1:00	NST
    new Rule(
      "Neth",
      1937,
      1937,
      5,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1937	only	-	Jul	 1	0:00	1:00	S
    new Rule(
      "Neth",
      1937,
      1937,
      7,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1937	1939	-	Oct	Sun>=2	2:00s	0	-
    new Rule(
      "Neth",
      1937,
      1939,
      10,
      new NextDayAfter(7, 2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Neth	1938	1939	-	May	15	2:00s	1:00	S
    new Rule(
      "Neth",
      1938,
      1939,
      5,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1945	only	-	Apr	 2	2:00s	1:00	S
    new Rule(
      "Neth",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Neth	1945	only	-	Sep	16	2:00s	0	-
    new Rule(
      "Neth",
      1945,
      1945,
      9,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Norway	1916	only	-	May	22	1:00	1:00	S
    new Rule(
      "Norway",
      1916,
      1916,
      5,
      new DayOfMonth(22),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Norway	1916	only	-	Sep	30	0:00	0	-
    new Rule(
      "Norway",
      1916,
      1916,
      9,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Norway	1945	only	-	Apr	 2	2:00s	1:00	S
    new Rule(
      "Norway",
      1945,
      1945,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Norway	1945	only	-	Oct	 1	2:00s	0	-
    new Rule(
      "Norway",
      1945,
      1945,
      10,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Norway	1959	1964	-	Mar	Sun>=15	2:00s	1:00	S
    new Rule(
      "Norway",
      1959,
      1964,
      3,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Norway	1959	1965	-	Sep	Sun>=15	2:00s	0	-
    new Rule(
      "Norway",
      1959,
      1965,
      9,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Norway	1965	only	-	Apr	25	2:00s	1:00	S
    new Rule(
      "Norway",
      1965,
      1965,
      4,
      new DayOfMonth(25),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1918	1919	-	Sep	16	2:00s	0	-
    new Rule(
      "Poland",
      1918,
      1919,
      9,
      new DayOfMonth(16),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1919	only	-	Apr	15	2:00s	1:00	S
    new Rule(
      "Poland",
      1919,
      1919,
      4,
      new DayOfMonth(15),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1944	only	-	Apr	 3	2:00s	1:00	S
    new Rule(
      "Poland",
      1944,
      1944,
      4,
      new DayOfMonth(3),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1944	only	-	Oct	 4	2:00	0	-
    new Rule(
      "Poland",
      1944,
      1944,
      10,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1945	only	-	Apr	29	0:00	1:00	S
    new Rule(
      "Poland",
      1945,
      1945,
      4,
      new DayOfMonth(29),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1945	only	-	Nov	 1	0:00	0	-
    new Rule(
      "Poland",
      1945,
      1945,
      11,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1946	only	-	Apr	14	0:00s	1:00	S
    new Rule(
      "Poland",
      1946,
      1946,
      4,
      new DayOfMonth(14),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1946	only	-	Oct	 7	2:00s	0	-
    new Rule(
      "Poland",
      1946,
      1946,
      10,
      new DayOfMonth(7),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1947	only	-	May	 4	2:00s	1:00	S
    new Rule(
      "Poland",
      1947,
      1947,
      5,
      new DayOfMonth(4),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1947	1949	-	Oct	Sun>=1	2:00s	0	-
    new Rule(
      "Poland",
      1947,
      1949,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1948	only	-	Apr	18	2:00s	1:00	S
    new Rule(
      "Poland",
      1948,
      1948,
      4,
      new DayOfMonth(18),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1949	only	-	Apr	10	2:00s	1:00	S
    new Rule(
      "Poland",
      1949,
      1949,
      4,
      new DayOfMonth(10),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1957	only	-	Jun	 2	1:00s	1:00	S
    new Rule(
      "Poland",
      1957,
      1957,
      6,
      new DayOfMonth(2),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1957	1958	-	Sep	lastSun	1:00s	0	-
    new Rule("Poland", 1957, 1958, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Poland	1958	only	-	Mar	30	1:00s	1:00	S
    new Rule(
      "Poland",
      1958,
      1958,
      3,
      new DayOfMonth(30),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1959	only	-	May	31	1:00s	1:00	S
    new Rule(
      "Poland",
      1959,
      1959,
      5,
      new DayOfMonth(31),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1959	1961	-	Oct	Sun>=1	1:00s	0	-
    new Rule(
      "Poland",
      1959,
      1961,
      10,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Poland	1960	only	-	Apr	 3	1:00s	1:00	S
    new Rule(
      "Poland",
      1960,
      1960,
      4,
      new DayOfMonth(3),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1961	1964	-	May	lastSun	1:00s	1:00	S
    new Rule(
      "Poland",
      1961,
      1964,
      5,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Poland	1962	1964	-	Sep	lastSun	1:00s	0	-
    new Rule("Poland", 1962, 1964, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Port	1916	only	-	Jun	17	23:00	1:00	S
    new Rule(
      "Port",
      1916,
      1916,
      6,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1916	only	-	Nov	 1	 1:00	0	-
    new Rule(
      "Port",
      1916,
      1916,
      11,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1917	only	-	Feb	28	23:00s	1:00	S
    new Rule(
      "Port",
      1917,
      1917,
      2,
      new DayOfMonth(28),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1917	1921	-	Oct	14	23:00s	0	-
    new Rule(
      "Port",
      1917,
      1921,
      10,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1918	only	-	Mar	 1	23:00s	1:00	S
    new Rule(
      "Port",
      1918,
      1918,
      3,
      new DayOfMonth(1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1919	only	-	Feb	28	23:00s	1:00	S
    new Rule(
      "Port",
      1919,
      1919,
      2,
      new DayOfMonth(28),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1920	only	-	Feb	29	23:00s	1:00	S
    new Rule(
      "Port",
      1920,
      1920,
      2,
      new DayOfMonth(29),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1921	only	-	Feb	28	23:00s	1:00	S
    new Rule(
      "Port",
      1921,
      1921,
      2,
      new DayOfMonth(28),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1924	only	-	Apr	16	23:00s	1:00	S
    new Rule(
      "Port",
      1924,
      1924,
      4,
      new DayOfMonth(16),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1924	only	-	Oct	14	23:00s	0	-
    new Rule(
      "Port",
      1924,
      1924,
      10,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1926	only	-	Apr	17	23:00s	1:00	S
    new Rule(
      "Port",
      1926,
      1926,
      4,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1926	1929	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Port",
      1926,
      1929,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1927	only	-	Apr	 9	23:00s	1:00	S
    new Rule(
      "Port",
      1927,
      1927,
      4,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1928	only	-	Apr	14	23:00s	1:00	S
    new Rule(
      "Port",
      1928,
      1928,
      4,
      new DayOfMonth(14),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1929	only	-	Apr	20	23:00s	1:00	S
    new Rule(
      "Port",
      1929,
      1929,
      4,
      new DayOfMonth(20),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1931	only	-	Apr	18	23:00s	1:00	S
    new Rule(
      "Port",
      1931,
      1931,
      4,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1931	1932	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Port",
      1931,
      1932,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1932	only	-	Apr	 2	23:00s	1:00	S
    new Rule(
      "Port",
      1932,
      1932,
      4,
      new DayOfMonth(2),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1934	only	-	Apr	 7	23:00s	1:00	S
    new Rule(
      "Port",
      1934,
      1934,
      4,
      new DayOfMonth(7),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1934	1938	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Port",
      1934,
      1938,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1935	only	-	Mar	30	23:00s	1:00	S
    new Rule(
      "Port",
      1935,
      1935,
      3,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1936	only	-	Apr	18	23:00s	1:00	S
    new Rule(
      "Port",
      1936,
      1936,
      4,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1937	only	-	Apr	 3	23:00s	1:00	S
    new Rule(
      "Port",
      1937,
      1937,
      4,
      new DayOfMonth(3),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1938	only	-	Mar	26	23:00s	1:00	S
    new Rule(
      "Port",
      1938,
      1938,
      3,
      new DayOfMonth(26),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1939	only	-	Apr	15	23:00s	1:00	S
    new Rule(
      "Port",
      1939,
      1939,
      4,
      new DayOfMonth(15),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1939	only	-	Nov	18	23:00s	0	-
    new Rule(
      "Port",
      1939,
      1939,
      11,
      new DayOfMonth(18),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1940	only	-	Feb	24	23:00s	1:00	S
    new Rule(
      "Port",
      1940,
      1940,
      2,
      new DayOfMonth(24),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1940	1941	-	Oct	 5	23:00s	0	-
    new Rule(
      "Port",
      1940,
      1941,
      10,
      new DayOfMonth(5),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1941	only	-	Apr	 5	23:00s	1:00	S
    new Rule(
      "Port",
      1941,
      1941,
      4,
      new DayOfMonth(5),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1942	1945	-	Mar	Sat>=8	23:00s	1:00	S
    new Rule(
      "Port",
      1942,
      1945,
      3,
      new NextDayAfter(6, 8),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1942	only	-	Apr	25	22:00s	2:00	M # Midsummer
    new Rule(
      "Port",
      1942,
      1942,
      4,
      new DayOfMonth(25),
      1320,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Port	1942	only	-	Aug	15	22:00s	1:00	S
    new Rule(
      "Port",
      1942,
      1942,
      8,
      new DayOfMonth(15),
      1320,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1942	1945	-	Oct	Sat>=24	23:00s	0	-
    new Rule(
      "Port",
      1942,
      1945,
      10,
      new NextDayAfter(6, 24),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1943	only	-	Apr	17	22:00s	2:00	M
    new Rule(
      "Port",
      1943,
      1943,
      4,
      new DayOfMonth(17),
      1320,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Port	1943	1945	-	Aug	Sat>=25	22:00s	1:00	S
    new Rule(
      "Port",
      1943,
      1945,
      8,
      new NextDayAfter(6, 25),
      1320,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1944	1945	-	Apr	Sat>=21	22:00s	2:00	M
    new Rule(
      "Port",
      1944,
      1945,
      4,
      new NextDayAfter(6, 21),
      1320,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Port	1946	only	-	Apr	Sat>=1	23:00s	1:00	S
    new Rule(
      "Port",
      1946,
      1946,
      4,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1946	only	-	Oct	Sat>=1	23:00s	0	-
    new Rule(
      "Port",
      1946,
      1946,
      10,
      new NextDayAfter(6, 1),
      1380,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1947	1949	-	Apr	Sun>=1	 2:00s	1:00	S
    new Rule(
      "Port",
      1947,
      1949,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1947	1949	-	Oct	Sun>=1	 2:00s	0	-
    new Rule(
      "Port",
      1947,
      1949,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1951	1965	-	Apr	Sun>=1	 2:00s	1:00	S
    new Rule(
      "Port",
      1951,
      1965,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1951	1965	-	Oct	Sun>=1	 2:00s	0	-
    new Rule(
      "Port",
      1951,
      1965,
      10,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Port	1977	only	-	Mar	27	 0:00s	1:00	S
    new Rule(
      "Port",
      1977,
      1977,
      3,
      new DayOfMonth(27),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1977	only	-	Sep	25	 0:00s	0	-
    new Rule("Port", 1977, 1977, 9, new DayOfMonth(25), 0, AtTimeZone.Local, 0),
    // Rule    Port	1978	1979	-	Apr	Sun>=1	 0:00s	1:00	S
    new Rule(
      "Port",
      1978,
      1979,
      4,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1978	only	-	Oct	 1	 0:00s	0	-
    new Rule("Port", 1978, 1978, 10, new DayOfMonth(1), 0, AtTimeZone.Local, 0),
    // Rule    Port	1979	1982	-	Sep	lastSun	 1:00s	0	-
    new Rule("Port", 1979, 1982, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Port	1980	only	-	Mar	lastSun	 0:00s	1:00	S
    new Rule(
      "Port",
      1980,
      1980,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1981	1982	-	Mar	lastSun	 1:00s	1:00	S
    new Rule(
      "Port",
      1981,
      1982,
      3,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Port	1983	only	-	Mar	lastSun	 2:00s	1:00	S
    new Rule(
      "Port",
      1983,
      1983,
      3,
      new LastDay(7),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1932	only	-	May	21	 0:00s	1:00	S
    new Rule(
      "Romania",
      1932,
      1932,
      5,
      new DayOfMonth(21),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1932	1939	-	Oct	Sun>=1	 0:00s	0	-
    new Rule(
      "Romania",
      1932,
      1939,
      10,
      new NextDayAfter(7, 1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Romania	1933	1939	-	Apr	Sun>=2	 0:00s	1:00	S
    new Rule(
      "Romania",
      1933,
      1939,
      4,
      new NextDayAfter(7, 2),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1979	only	-	May	27	 0:00	1:00	S
    new Rule(
      "Romania",
      1979,
      1979,
      5,
      new DayOfMonth(27),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1979	only	-	Sep	lastSun	 0:00	0	-
    new Rule("Romania", 1979, 1979, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Romania	1980	only	-	Apr	 5	23:00	1:00	S
    new Rule(
      "Romania",
      1980,
      1980,
      4,
      new DayOfMonth(5),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1980	only	-	Sep	lastSun	 1:00	0	-
    new Rule("Romania", 1980, 1980, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Romania	1991	1993	-	Mar	lastSun	 0:00s	1:00	S
    new Rule(
      "Romania",
      1991,
      1993,
      3,
      new LastDay(7),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Romania	1991	1993	-	Sep	lastSun	 0:00s	0	-
    new Rule("Romania", 1991, 1993, 9, new LastDay(7), 0, AtTimeZone.Local, 0),
    // Rule    Spain	1918	only	-	Apr	15	23:00	1:00	S
    new Rule(
      "Spain",
      1918,
      1918,
      4,
      new DayOfMonth(15),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1918	1919	-	Oct	 6	24:00s	0	-
    new Rule(
      "Spain",
      1918,
      1919,
      10,
      new DayOfMonth(6),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1919	only	-	Apr	 6	23:00	1:00	S
    new Rule(
      "Spain",
      1919,
      1919,
      4,
      new DayOfMonth(6),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1924	only	-	Apr	16	23:00	1:00	S
    new Rule(
      "Spain",
      1924,
      1924,
      4,
      new DayOfMonth(16),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1924	only	-	Oct	 4	24:00s	0	-
    new Rule(
      "Spain",
      1924,
      1924,
      10,
      new DayOfMonth(4),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1926	only	-	Apr	17	23:00	1:00	S
    new Rule(
      "Spain",
      1926,
      1926,
      4,
      new DayOfMonth(17),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1926	1929	-	Oct	Sat>=1	24:00s	0	-
    new Rule(
      "Spain",
      1926,
      1929,
      10,
      new NextDayAfter(6, 1),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1927	only	-	Apr	 9	23:00	1:00	S
    new Rule(
      "Spain",
      1927,
      1927,
      4,
      new DayOfMonth(9),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1928	only	-	Apr	15	 0:00	1:00	S
    new Rule(
      "Spain",
      1928,
      1928,
      4,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1929	only	-	Apr	20	23:00	1:00	S
    new Rule(
      "Spain",
      1929,
      1929,
      4,
      new DayOfMonth(20),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1937	only	-	Jun	16	23:00	1:00	S
    new Rule(
      "Spain",
      1937,
      1937,
      6,
      new DayOfMonth(16),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1937	only	-	Oct	 2	24:00s	0	-
    new Rule(
      "Spain",
      1937,
      1937,
      10,
      new DayOfMonth(2),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1938	only	-	Apr	 2	23:00	1:00	S
    new Rule(
      "Spain",
      1938,
      1938,
      4,
      new DayOfMonth(2),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1938	only	-	Apr	30	23:00	2:00	M
    new Rule(
      "Spain",
      1938,
      1938,
      4,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      7200000
    ),
    // Rule    Spain	1938	only	-	Oct	 2	24:00	1:00	S
    new Rule(
      "Spain",
      1938,
      1938,
      10,
      new DayOfMonth(2),
      1440,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1939	only	-	Oct	 7	24:00s	0	-
    new Rule(
      "Spain",
      1939,
      1939,
      10,
      new DayOfMonth(7),
      1440,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1942	only	-	May	 2	23:00	1:00	S
    new Rule(
      "Spain",
      1942,
      1942,
      5,
      new DayOfMonth(2),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1942	only	-	Sep	 1	 1:00	0	-
    new Rule(
      "Spain",
      1942,
      1942,
      9,
      new DayOfMonth(1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1943	1946	-	Apr	Sat>=13	23:00	1:00	S
    new Rule(
      "Spain",
      1943,
      1946,
      4,
      new NextDayAfter(6, 13),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1943	1944	-	Oct	Sun>=1	 1:00	0	-
    new Rule(
      "Spain",
      1943,
      1944,
      10,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1945	1946	-	Sep	lastSun	 1:00	0	-
    new Rule("Spain", 1945, 1946, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Spain	1949	only	-	Apr	30	23:00	1:00	S
    new Rule(
      "Spain",
      1949,
      1949,
      4,
      new DayOfMonth(30),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1949	only	-	Oct	 2	 1:00	0	-
    new Rule(
      "Spain",
      1949,
      1949,
      10,
      new DayOfMonth(2),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1974	1975	-	Apr	Sat>=12	23:00	1:00	S
    new Rule(
      "Spain",
      1974,
      1975,
      4,
      new NextDayAfter(6, 12),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1974	1975	-	Oct	Sun>=1	 1:00	0	-
    new Rule(
      "Spain",
      1974,
      1975,
      10,
      new NextDayAfter(7, 1),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Spain	1976	only	-	Mar	27	23:00	1:00	S
    new Rule(
      "Spain",
      1976,
      1976,
      3,
      new DayOfMonth(27),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1976	1977	-	Sep	lastSun	 1:00	0	-
    new Rule("Spain", 1976, 1977, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Spain	1977	only	-	Apr	 2	23:00	1:00	S
    new Rule(
      "Spain",
      1977,
      1977,
      4,
      new DayOfMonth(2),
      1380,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1978	only	-	Apr	 2	 2:00s	1:00	S
    new Rule(
      "Spain",
      1978,
      1978,
      4,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Spain	1978	only	-	Oct	 1	 2:00s	0	-
    new Rule(
      "Spain",
      1978,
      1978,
      10,
      new DayOfMonth(1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule SpainAfrica 1967    only	-	Jun	 3	12:00	1:00	S
    new Rule(
      "SpainAfrica",
      1967,
      1967,
      6,
      new DayOfMonth(3),
      720,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SpainAfrica 1967    only	-	Oct	 1	 0:00	0	-
    new Rule(
      "SpainAfrica",
      1967,
      1967,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule SpainAfrica 1974    only	-	Jun	24	 0:00	1:00	S
    new Rule(
      "SpainAfrica",
      1974,
      1974,
      6,
      new DayOfMonth(24),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SpainAfrica 1974    only	-	Sep	 1	 0:00	0	-
    new Rule(
      "SpainAfrica",
      1974,
      1974,
      9,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule SpainAfrica 1976    1977	-	May	 1	 0:00	1:00	S
    new Rule(
      "SpainAfrica",
      1976,
      1977,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SpainAfrica 1976    only	-	Aug	 1	 0:00	0	-
    new Rule(
      "SpainAfrica",
      1976,
      1976,
      8,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule SpainAfrica 1977    only	-	Sep	28	 0:00	0	-
    new Rule(
      "SpainAfrica",
      1977,
      1977,
      9,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule SpainAfrica 1978    only	-	Jun	 1	 0:00	1:00	S
    new Rule(
      "SpainAfrica",
      1978,
      1978,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule SpainAfrica 1978    only	-	Aug	 4	 0:00	0	-
    new Rule(
      "SpainAfrica",
      1978,
      1978,
      8,
      new DayOfMonth(4),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Swiss	1941	1942	-	May	Mon>=1	1:00	1:00	S
    new Rule(
      "Swiss",
      1941,
      1942,
      5,
      new NextDayAfter(1, 1),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Swiss	1941	1942	-	Oct	Mon>=1	2:00	0	-
    new Rule(
      "Swiss",
      1941,
      1942,
      10,
      new NextDayAfter(1, 1),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1916	only	-	May	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1916,
      1916,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1916	only	-	Oct	 1	0:00	0	-
    new Rule(
      "Turkey",
      1916,
      1916,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1920	only	-	Mar	28	0:00	1:00	S
    new Rule(
      "Turkey",
      1920,
      1920,
      3,
      new DayOfMonth(28),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1920	only	-	Oct	25	0:00	0	-
    new Rule(
      "Turkey",
      1920,
      1920,
      10,
      new DayOfMonth(25),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1921	only	-	Apr	 3	0:00	1:00	S
    new Rule(
      "Turkey",
      1921,
      1921,
      4,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1921	only	-	Oct	 3	0:00	0	-
    new Rule(
      "Turkey",
      1921,
      1921,
      10,
      new DayOfMonth(3),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1922	only	-	Mar	26	0:00	1:00	S
    new Rule(
      "Turkey",
      1922,
      1922,
      3,
      new DayOfMonth(26),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1922	only	-	Oct	 8	0:00	0	-
    new Rule(
      "Turkey",
      1922,
      1922,
      10,
      new DayOfMonth(8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1924	only	-	May	13	0:00	1:00	S
    new Rule(
      "Turkey",
      1924,
      1924,
      5,
      new DayOfMonth(13),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1924	1925	-	Oct	 1	0:00	0	-
    new Rule(
      "Turkey",
      1924,
      1925,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1925	only	-	May	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1925,
      1925,
      5,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1940	only	-	Jul	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1940,
      1940,
      7,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1940	only	-	Oct	 6	0:00	0	-
    new Rule(
      "Turkey",
      1940,
      1940,
      10,
      new DayOfMonth(6),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1940	only	-	Dec	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1940,
      1940,
      12,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1941	only	-	Sep	21	0:00	0	-
    new Rule(
      "Turkey",
      1941,
      1941,
      9,
      new DayOfMonth(21),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1942	only	-	Apr	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1942,
      1942,
      4,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1945	only	-	Oct	 8	0:00	0	-
    new Rule(
      "Turkey",
      1945,
      1945,
      10,
      new DayOfMonth(8),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1946	only	-	Jun	 1	0:00	1:00	S
    new Rule(
      "Turkey",
      1946,
      1946,
      6,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1946	only	-	Oct	 1	0:00	0	-
    new Rule(
      "Turkey",
      1946,
      1946,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1947	1948	-	Apr	Sun>=16	0:00	1:00	S
    new Rule(
      "Turkey",
      1947,
      1948,
      4,
      new NextDayAfter(7, 16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1947	1951	-	Oct	Sun>=2	0:00	0	-
    new Rule(
      "Turkey",
      1947,
      1951,
      10,
      new NextDayAfter(7, 2),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1949	only	-	Apr	10	0:00	1:00	S
    new Rule(
      "Turkey",
      1949,
      1949,
      4,
      new DayOfMonth(10),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1950	only	-	Apr	16	0:00	1:00	S
    new Rule(
      "Turkey",
      1950,
      1950,
      4,
      new DayOfMonth(16),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1951	only	-	Apr	22	0:00	1:00	S
    new Rule(
      "Turkey",
      1951,
      1951,
      4,
      new DayOfMonth(22),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1962	only	-	Jul	15	0:00	1:00	S
    new Rule(
      "Turkey",
      1962,
      1962,
      7,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1963	only	-	Oct	30	0:00	0	-
    new Rule(
      "Turkey",
      1963,
      1963,
      10,
      new DayOfMonth(30),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1964	only	-	May	15	0:00	1:00	S
    new Rule(
      "Turkey",
      1964,
      1964,
      5,
      new DayOfMonth(15),
      0,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1964	only	-	Oct	 1	0:00	0	-
    new Rule(
      "Turkey",
      1964,
      1964,
      10,
      new DayOfMonth(1),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1973	only	-	Jun	 3	1:00	1:00	S
    new Rule(
      "Turkey",
      1973,
      1973,
      6,
      new DayOfMonth(3),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1973	1976	-	Oct	Sun>=31	2:00	0	-
    new Rule(
      "Turkey",
      1973,
      1976,
      10,
      new NextDayAfter(7, 31),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1974	only	-	Mar	31	2:00	1:00	S
    new Rule(
      "Turkey",
      1974,
      1974,
      3,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1975	only	-	Mar	22	2:00	1:00	S
    new Rule(
      "Turkey",
      1975,
      1975,
      3,
      new DayOfMonth(22),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1976	only	-	Mar	21	2:00	1:00	S
    new Rule(
      "Turkey",
      1976,
      1976,
      3,
      new DayOfMonth(21),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1977	1978	-	Apr	Sun>=1	2:00	1:00	S
    new Rule(
      "Turkey",
      1977,
      1978,
      4,
      new NextDayAfter(7, 1),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1977	1978	-	Oct	Sun>=15	2:00	0	-
    new Rule(
      "Turkey",
      1977,
      1978,
      10,
      new NextDayAfter(7, 15),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1978	only	-	Jun	29	0:00	0	-
    new Rule(
      "Turkey",
      1978,
      1978,
      6,
      new DayOfMonth(29),
      0,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1983	only	-	Jul	31	2:00	1:00	S
    new Rule(
      "Turkey",
      1983,
      1983,
      7,
      new DayOfMonth(31),
      120,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1983	only	-	Oct	 2	2:00	0	-
    new Rule(
      "Turkey",
      1983,
      1983,
      10,
      new DayOfMonth(2),
      120,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1985	only	-	Apr	20	1:00s	1:00	S
    new Rule(
      "Turkey",
      1985,
      1985,
      4,
      new DayOfMonth(20),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1985	only	-	Sep	28	1:00s	0	-
    new Rule(
      "Turkey",
      1985,
      1985,
      9,
      new DayOfMonth(28),
      60,
      AtTimeZone.Local,
      0
    ),
    // Rule    Turkey	1986	1993	-	Mar	lastSun	1:00s	1:00	S
    new Rule(
      "Turkey",
      1986,
      1993,
      3,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1986	1995	-	Sep	lastSun	1:00s	0	-
    new Rule("Turkey", 1986, 1995, 9, new LastDay(7), 60, AtTimeZone.Local, 0),
    // Rule    Turkey	1994	only	-	Mar	20	1:00s	1:00	S
    new Rule(
      "Turkey",
      1994,
      1994,
      3,
      new DayOfMonth(20),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1995	2006	-	Mar	lastSun	1:00s	1:00	S
    new Rule(
      "Turkey",
      1995,
      2006,
      3,
      new LastDay(7),
      60,
      AtTimeZone.Local,
      3600000
    ),
    // Rule    Turkey	1996	2006	-	Oct	lastSun	1:00s	0	-
    new Rule("Turkey", 1996, 2006, 10, new LastDay(7), 60, AtTimeZone.Local, 0),
  ];
}
export { zones, rules };
