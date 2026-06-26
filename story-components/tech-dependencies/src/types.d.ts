export interface Service {
  id: string;
  /** Human-readable product name */
  product: string;
  /** ISO-3166 alpha-2 country code of the vendor's primary HQ */
  country: string;
  description?: string;
  /** 0–1: how critical is this service to running the magazine */
  centrality?: number;
  /** 0–1: how hard would it be to migrate away from this service */
  lockIn?: number;
  /** 0–1: how sensitive is the data hosted or processed */
  sensitivity?: number;
}

export interface Dataset {
  services: Service[];
}
