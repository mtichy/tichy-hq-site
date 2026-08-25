export type FieldEntry = {
  name: string
  uscfId: string
  uscfRating: number
  fideRating: number | null
  state: string
  schedule: '2 Day' | '3 Day' | '4 Day'
  withdrawn?: boolean
  isPlayer?: boolean
  notes: string
}

export const nysChampionship = {
  title: '148th NY State Championship',
  shortTitle: 'NYS Championship',
  location: 'Albany Marriott, Albany, NY',
  startDate: '2026-09-04',
  endDate: '2026-09-07',
  rounds: 6,
  timeControl: '40/80, SD/30; d30',
  section: 'Championship (1900+)',
  format: '6-round Swiss · September official USCF ratings',
  entryListUrl:
    'https://chessaction.com/tournaments/advance_entry_list.php?tid=nKOlog%3D%3D',
  infoUrl: 'https://www.chesstour.com/nysc26.htm',
  fieldSnapshotDate: '2026-08-13',
  schedule: [
    { label: '4-day R1', when: 'Fri Sep 4, 7:00 PM' },
    { label: 'Merge / R2', when: 'Sat Sep 5, 6:00 PM' },
    { label: 'R3', when: 'Sun Sep 6, 12:00 PM' },
    { label: 'R4', when: 'Sun Sep 6, 6:00 PM' },
    { label: 'R5', when: 'Mon Sep 7, 10:00 AM' },
    { label: 'R6', when: 'Mon Sep 7, 3:30 PM' },
  ],
  field: [
    {
      name: 'David E Carter',
      uscfId: '10029732',
      uscfRating: 2200,
      fideRating: 1921,
      state: 'VT',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Alex Sinnott',
      uscfId: '13513605',
      uscfRating: 2188,
      fideRating: 1937,
      state: 'NY',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Armaan Chandragupta Jain',
      uscfId: '30230374',
      uscfRating: 2179,
      fideRating: 1896,
      state: 'NY',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Edison Burgos Rodriguez',
      uscfId: '12542136',
      uscfRating: 2100,
      fideRating: 1795,
      state: '',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Grayson Xiang',
      uscfId: '30650149',
      uscfRating: 2035,
      fideRating: 1907,
      state: 'NY',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Jin Ma',
      uscfId: '16813308',
      uscfRating: 2032,
      fideRating: 1859,
      state: 'NY',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Adam Gordon',
      uscfId: '16577100',
      uscfRating: 2014,
      fideRating: 1878,
      state: 'NY',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Leon Chu',
      uscfId: '17015896',
      uscfRating: 2011,
      fideRating: 1868,
      state: 'NY',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Alek Safarian',
      uscfId: '32544394',
      uscfRating: 2002,
      fideRating: 1892,
      state: 'NY',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Liam Siu',
      uscfId: '30022059',
      uscfRating: 1988,
      fideRating: 1734,
      state: 'NY',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Dean',
      uscfId: '31329150',
      uscfRating: 1945,
      fideRating: null,
      state: 'NY',
      schedule: '4 Day',
      isPlayer: true,
      notes:
        '4-day Championship. Live Regular 1954 as of the coaching snapshot.',
    },
    {
      name: 'Shiv Dubey',
      uscfId: '17241381',
      uscfRating: 1933,
      fideRating: 1752,
      state: 'NY',
      schedule: '4 Day',
      notes: '',
    },
    {
      name: 'Calliste Herve-Mignucci',
      uscfId: '16787928',
      uscfRating: 1928,
      fideRating: 1719,
      state: 'CT',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Alvin Lou',
      uscfId: '30228821',
      uscfRating: 1914,
      fideRating: 1774,
      state: 'NY',
      schedule: '3 Day',
      notes: '',
    },
    {
      name: 'Jianchao Zhou (GM)',
      uscfId: '15524414',
      uscfRating: 2652,
      fideRating: 2577,
      state: 'MA',
      schedule: '3 Day',
      withdrawn: true,
      notes: 'Withdrawn on the advance-entry list.',
    },
  ] satisfies FieldEntry[],
} as const

export type NysChampionship = typeof nysChampionship

export function daysUntilEventStart(isoDate: string, now = Date.now()): number {
  const start = new Date(`${isoDate}T19:00:00-04:00`)
  return Math.ceil((start.getTime() - now) / 86_400_000)
}
