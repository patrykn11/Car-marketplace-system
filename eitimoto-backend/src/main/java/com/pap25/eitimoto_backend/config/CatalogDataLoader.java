package com.pap25.eitimoto_backend.config;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.pap25.eitimoto_backend.entities.Brand;
import com.pap25.eitimoto_backend.entities.CarModel;
import com.pap25.eitimoto_backend.repository.BrandRepository;
import com.pap25.eitimoto_backend.repository.CarModelRepository;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CatalogDataLoader implements CommandLineRunner {

    private final BrandRepository brandRepository;
    private final CarModelRepository carModelRepository;

    @Override
    public void run(String... args) throws Exception {
        if (brandRepository.count() == 0) {
            // Brands
            Brand audi = brandRepository.save(Brand.builder().name("Audi").logoUrl("/brands/audi.svg").build());
            Brand bmw = brandRepository.save(Brand.builder().name("BMW").logoUrl("/brands/bmw.svg").build());
            Brand mercedes = brandRepository.save(Brand.builder().name("Mercedes").logoUrl("/brands/mercedes.svg").build());
            Brand toyota = brandRepository.save(Brand.builder().name("Toyota").logoUrl("/brands/toyota.svg").build());
            Brand ford = brandRepository.save(Brand.builder().name("Ford").logoUrl("/brands/ford.svg").build());
            Brand honda = brandRepository.save(Brand.builder().name("Honda").logoUrl("/brands/honda.svg").build());
            Brand volkswagen = brandRepository.save(Brand.builder().name("Volkswagen").logoUrl("/brands/volkswagen.svg").build());
            Brand nissan = brandRepository.save(Brand.builder().name("Nissan").logoUrl("/brands/nissan.svg").build());
            Brand hyundai = brandRepository.save(Brand.builder().name("Hyundai").logoUrl("/brands/hyundai.svg").build());
            // Models
            carModelRepository.save(CarModel.builder()
                .name("A4")
                .brand(audi)
                .horsePower(150)
                .photoUrl("/models/audi-a4.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("A6")
                .brand(audi)
                .horsePower(220)
                .photoUrl("/models/audi-a6.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("3 Series")
                .brand(bmw)
                .horsePower(180)
                .photoUrl("/models/bmw-3-series.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("5 Series")
                .brand(bmw)
                .horsePower(250)
                .photoUrl("/models/bmw-5-series.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("C-Class")
                .brand(mercedes)
                .horsePower(200)
                .photoUrl("/models/mercedes-c-class.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("E-Class")
                .brand(mercedes)
                .horsePower(300)
                .photoUrl("/models/mercedes-e-class.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Corolla")
                .brand(toyota)
                .horsePower(132)
                .photoUrl("/models/toyota-corolla.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Camry")
                .brand(toyota)
                .horsePower(203)
                .photoUrl("/models/toyota-camry.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("F-150")
                .brand(ford)
                .horsePower(290)
                .photoUrl("/models/ford-f150.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Mustang")
                .brand(ford)
                .horsePower(450)
                .photoUrl("/models/ford-mustang.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Civic")
                .brand(honda)
                .horsePower(158)
                .photoUrl("/models/honda-civic.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Accord")
                .brand(honda)
                .horsePower(192)
                .photoUrl("/models/honda-accord.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Golf")
                .brand(volkswagen)
                .horsePower(147)
                .photoUrl("/models/vw-golf.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Passat")
                .brand(volkswagen)
                .horsePower(174)
                .photoUrl("/models/vw-passat.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Altima")
                .brand(nissan)
                .horsePower(188)
                .photoUrl("/models/nissan-altima.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Sentra")
                .brand(nissan)
                .horsePower(149)
                .photoUrl("/models/nissan-sentra.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Elantra")
                .brand(hyundai)
                .horsePower(147)
                .photoUrl("/models/hyundai-elantra.jpg")
                .build());
            carModelRepository.save(CarModel.builder()
                .name("Sonata")
                .brand(hyundai)
                .horsePower(191)
                .photoUrl("/models/hyundai-sonata.jpg")
                .build());
            
            System.out.println(">>> TEST DATA LOADED!");
        }
    }
}