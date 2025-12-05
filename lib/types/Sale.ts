export interface ISale {
     idsale: number,
     totalItems: number,
     totalSale: number,
     status: 'Pending' | 'Completed' | 'Lost',
     desc: string,
     clientId: number,
     productId: number,
     createdAt: string     
}