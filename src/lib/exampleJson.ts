export const exampleJson = [
    {
        "@level": "debug",
        "@message":
            'ReferenceTransformer: "provider[\\"tf-registry.t1.cloud/t1cloud/t1cloud\\"]" references: []',
        "@timestamp": "2025-09-09T15:31:32.877911+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.AttachDependenciesTransformer",
        "@timestamp": "2025-09-09T15:31:32.877914+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "AttachDependenciesTransformer: t1_vpc_vip.foo (expand) depends on [data.t1_vpc_network.default data.t1_vpc_subnet.foo]",
        "@timestamp": "2025-09-09T15:31:32.877924+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "AttachDependenciesTransformer: data.t1_vpc_subnet.foo (expand) depends on [data.t1_vpc_network.default]",
        "@timestamp": "2025-09-09T15:31:32.877929+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "AttachDependenciesTransformer: data.t1_vpc_network.default (expand) depends on []",
        "@timestamp": "2025-09-09T15:31:32.877937+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.attachDataResourceDependsOnTransformer",
        "@timestamp": "2025-09-09T15:31:32.877940+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "attachDataDependenciesTransformer: data.t1_vpc_subnet.foo depends on []",
        "@timestamp": "2025-09-09T15:31:32.877954+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "attachDataDependenciesTransformer: data.t1_vpc_network.default depends on []",
        "@timestamp": "2025-09-09T15:31:32.877962+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.DestroyEdgeTransformer",
        "@timestamp": "2025-09-09T15:31:32.877965+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.pruneUnusedNodesTransformer",
        "@timestamp": "2025-09-09T15:31:32.877970+03:00",
    },
    {
        "@level": "trace",
        "@message": "Executing graph transform *terraform.TargetsTransformer",
        "@timestamp": "2025-09-09T15:31:32.877973+03:00",
    },
    {
        "@level": "trace",
        "@message": "Executing graph transform *terraform.ForcedCBDTransformer",
        "@timestamp": "2025-09-09T15:31:32.877976+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'ForcedCBDTransformer: "data.t1_vpc_subnet.foo (expand)" (*terraform.nodeExpandPlannableResource) has no CBD descendant, so skipping',
        "@timestamp": "2025-09-09T15:31:32.877981+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'ForcedCBDTransformer: "data.t1_vpc_network.default (expand)" (*terraform.nodeExpandPlannableResource) has no CBD descendant, so skipping',
        "@timestamp": "2025-09-09T15:31:32.877985+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'ForcedCBDTransformer: "t1_vpc_vip.foo (expand)" (*terraform.nodeExpandPlannableResource) has no CBD descendant, so skipping',
        "@timestamp": "2025-09-09T15:31:32.877989+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.ephemeralResourceCloseTransformer",
        "@timestamp": "2025-09-09T15:31:32.877991+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.CloseProviderTransformer",
        "@timestamp": "2025-09-09T15:31:32.877995+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.CloseRootModuleTransformer",
        "@timestamp": "2025-09-09T15:31:32.878007+03:00",
    },
    {
        "@level": "trace",
        "@message":
            "Executing graph transform *terraform.TransitiveReductionTransformer",
        "@timestamp": "2025-09-09T15:31:32.878016+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'Completed graph transform:\ndata.t1_vpc_network.default (expand) - *terraform.nodeExpandPlannableResource\n  provider["tf-registry.t1.cloud/t1cloud/t1cloud"] - *terraform.NodeApplyableProvider\ndata.t1_vpc_subnet.foo (expand) - *terraform.nodeExpandPlannableResource\n  data.t1_vpc_network.default (expand) - *terraform.nodeExpandPlannableResource\nprovider["tf-registry.t1.cloud/t1cloud/t1cloud"] - *terraform.NodeApplyableProvider\nprovider["tf-registry.t1.cloud/t1cloud/t1cloud"] (close) - *terraform.graphNodeCloseProvider\n  t1_vpc_vip.foo (expand) - *terraform.nodeExpandPlannableResource\nroot - *terraform.nodeCloseModule\n  provider["tf-registry.t1.cloud/t1cloud/t1cloud"] (close) - *terraform.graphNodeCloseProvider\nt1_vpc_vip.foo (expand) - *terraform.nodeExpandPlannableResource\n  data.t1_vpc_subnet.foo (expand) - *terraform.nodeExpandPlannableResource\n  ------',
        "@timestamp": "2025-09-09T15:31:32.878043+03:00",
    },
    {
        "@level": "debug",
        "@message": "Starting graph walk: walkPlan",
        "@timestamp": "2025-09-09T15:31:32.878052+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'vertex "provider[\\"tf-registry.t1.cloud/t1cloud/t1cloud\\"]": starting visit (*terraform.NodeApplyableProvider)',
        "@timestamp": "2025-09-09T15:31:32.878099+03:00",
    },
    {
        "@level": "trace",
        "@message":
            'vertex "provider[\\"tf-registry.t1.cloud/t1cloud/t1cloud\\"]": belongs to',
        "@timestamp": "2025-09-09T15:31:32.878106+03:00",
    },
    {
        "@level": "debug",
        "@message": "created provider logger",
        "@timestamp": "2025-09-09T15:31:32.878143+03:00",
        level: 1,
    },
];
