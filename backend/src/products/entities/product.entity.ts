import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    imageUrl: string;

    @Column({ default: true })
    isAvailable: boolean;

    @Column('decimal', { precision: 2, scale: 1, default: 0 })
    rating: number;

    @Column('int', { default: 0 })
    reviewCount: number;

    @CreateDateColumn()
    createdAt: Date;
}
